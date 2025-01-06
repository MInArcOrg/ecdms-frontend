import React, { useReducer, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Pagination,
  Snackbar,
  Alert,
} from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';

import roadSegmentApiService from 'src/services/road-info/road-info-segment-service';
import Icon from 'src/@core/components/icon';
import RoadSegmentForm from './roadsegmentsform';
import { RoadSegment } from 'src/types/project/other';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';

const ActionTypes = {
  SET_DATA: 'SET_DATA',
  SET_FORM: 'SET_FORM',
  RESET_FORM: 'RESET_FORM',
  SET_SNACKBAR: 'SET_SNACKBAR',
  SET_PAGINATION: 'SET_PAGINATION',
} as const;

type ActionType = typeof ActionTypes[keyof typeof ActionTypes];

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

interface RoadSegmentState {
  roadSegments: RoadSegment[];
  formData: Partial<RoadSegment>;
  loading: boolean;
  snackbar: SnackbarState;
  pagination: PaginationState;
}

type Action =
  | { type: 'SET_DATA'; payload: RoadSegment[] }
  | { type: 'SET_FORM'; payload: Partial<RoadSegment> }
  | { type: 'RESET_FORM' }
  | { type: 'SET_SNACKBAR'; payload: SnackbarState }
  | { type: 'SET_PAGINATION'; payload: PaginationState };

  const initialState: RoadSegmentState = {
    roadSegments: [],
    formData: { 
      id: '', 
      name: '', 
      specifications: '', 
      no_of_layers: 0, 
      length: 0, 
      width: 0, 
      project_id: '' 
    },
    loading: true,
    snackbar: { open: false, message: '', severity: 'success' },
    pagination: { page: 1, pageSize: 10, total: 0 },
  };


function reducer(state: RoadSegmentState, action: Action): RoadSegmentState {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, roadSegments: action.payload, loading: false };
    case 'SET_FORM':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'RESET_FORM':
      return { ...state, formData: initialState.formData };
    case 'SET_SNACKBAR':
      return { ...state, snackbar: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: action.payload };
    default:
      return state;
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  specifications: Yup.string()
    .required('Specifications are required')
    .max(100, 'Specifications cannot exceed 100 characters'),
  no_of_layers: Yup.number()
    .required('Number of layers is required')
    .min(1, 'Number of layers must be at least 1')
    .integer('Number of layers must be an integer'),
  length: Yup.number()
    .required('Length is required')
    .positive('Length must be a positive number')
    .max(1000, 'Length cannot exceed 1000 units'),
  width: Yup.number()
    .required('Width is required')
    .positive('Width must be a positive number')
    .max(5000, 'Width cannot exceed 1000 units'),
});


const RoadSegmentPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFormVisible, setFormVisible] = useState(false);

  const refetchData = () => {
    roadSegmentApiService
      .getAll('roadSegment', {
        pagination: { page: state.pagination.page, pageSize: state.pagination.pageSize }
      })
      .then(response => {
        dispatch({ type: 'SET_DATA', payload: response.payload });
        dispatch({ type: 'SET_PAGINATION', payload: response._attributes.pagination });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        dispatch({ type: 'SET_SNACKBAR', payload: { open: true, message: 'Failed to fetch road segments', severity: 'error' } });
      });
  };
  
  

  useEffect(() => {
    refetchData();
  }, [state.pagination.page, state.pagination.pageSize]);

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FORM', payload: { [name]: value } });
  };

  const handleEdit = (segment: RoadSegment) => {
    dispatch({ type: 'SET_FORM', payload: segment });
    setFormVisible(true);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isEdit = Boolean(state.formData.id);
    
    const dataToSubmit = {
      data: {
        ...state.formData,
        project_id: state.formData.project_id || '',
        created_at: state.formData.created_at || new Date(),
        name: state.formData.name || '',
        updated_at: state.formData.updated_at ?? new Date(), 
      },
      files: [],  
    };
    
    
  
    try {
      await validationSchema.validate(dataToSubmit.data, { abortEarly: false });
  
      const response = isEdit
        ? await roadSegmentApiService.update(dataToSubmit.data.id! as string, 'roadSegment', dataToSubmit)
        : await roadSegmentApiService.create('roadSegment', dataToSubmit);
  
      dispatch({
        type: 'SET_DATA',
        payload: isEdit
          ? state.roadSegments.map(segment =>
              segment.id === dataToSubmit.data.id ? { ...segment, ...response.data } : segment
            )
          : [...state.roadSegments, response.data],
      });
  
      dispatch({ type: 'SET_SNACKBAR', payload: { open: true, message: isEdit ? 'Updated successfully' : 'Created successfully', severity: 'success' } });
      toast.success(isEdit ? 'Updated successfully' : 'Created successfully');
      dispatch({ type: 'RESET_FORM' });
      setFormVisible(false);
      refetchData();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      await roadSegmentApiService.delete(id, 'roadSegment');
      toast.success('Deleted successfully');
      refetchData();
    } catch {
      dispatch({ type: 'SET_SNACKBAR', payload: { open: true, message: 'Failed to delete', severity: 'error' } });
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" marginBottom={3}>Manage Road Segments</Typography>

      <IconButton onClick={() => setFormVisible(true)} color="primary" style={{ marginBottom: '20px' }}>
        <Icon icon="tabler:plus" fontSize="1.5rem" />
      </IconButton>

      <RoadSegmentForm
  formData={state.formData as RoadSegment} 
  onFormChange={handleFormChange}
  onSubmit={handleFormSubmit}
  isVisible={isFormVisible}
  onClose={() => setFormVisible(false)}
/>


     
<Box marginTop={4}>
        <Typography variant="h5" marginBottom={2}>Existing Road Segments</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Specifications</TableCell>
                <TableCell>Number of Layers</TableCell>
                <TableCell>Length</TableCell>
                <TableCell>Width</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.roadSegments.map((segment) => (
                <TableRow key={segment.id}>
                  <TableCell>{segment.name}</TableCell>
                  <TableCell>{segment.specifications}</TableCell>
                  <TableCell>{segment.no_of_layers}</TableCell>
                  <TableCell>{segment.length}</TableCell>
                  <TableCell>{segment.width}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(segment)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton 
  onClick={() => handleDelete(segment.id || '')} 
  style={{ color: 'red' }}
>
  <GridDeleteIcon />
</IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={Math.ceil(state.pagination.total / state.pagination.pageSize)}
          page={state.pagination.page}
          onChange={(_, value) => dispatch({ type: ActionTypes.SET_PAGINATION, payload: { ...state.pagination, page: value } })}
          style={{ marginTop: '20px', justifyContent: 'center', display: 'flex' }}
        />
      </Box>
    </Box>
  );
};

export default RoadSegmentPage;
