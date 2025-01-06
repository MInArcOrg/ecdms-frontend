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
} from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import roadInfoApiService from 'src/services/road-info/road-info-service';
import Icon from 'src/@core/components/icon';
import { RoadInfoForm } from './roadinfoform';
import useRoadInfoData from 'src/@core/hooks/useRoadInfoData';
import { RoadInfoState, Action } from 'src/types/road/roadinfo';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';

const roadInfoValidationSchema = Yup.object().shape({
  material: Yup.string().required('Material is required'),
  location_function: Yup.string().required('Location is required'),
  traffic_volume: Yup.number().required('Traffic volume is required').min(0, 'Traffic volume must be positive'),
  traffic_type: Yup.string().required('Traffic type is required'),
  economy: Yup.string().required('Economy is required'),
  rigidity: Yup.string().required('Rigidity is required'),
  topography: Yup.string().required('Topography is required'),
  project_id: Yup.string().required('Project ID is required')
});

const ActionTypes = {
  SET_DATA: 'SET_DATA',
  SET_FORM: 'SET_FORM',
  RESET_FORM: 'RESET_FORM',
  SET_SNACKBAR: 'SET_SNACKBAR',
  SET_PAGINATION: 'SET_PAGINATION'
} as const;

const initialState: RoadInfoState = {
  roadInfoData: [],
  formData: {
    id: '',
    material: '',
    location_function: '',
    traffic_volume: 0,
    traffic_type: '',
    economy: '',
    rigidity: '',
    topography: '',
    project_id: '',
    created_at: new Date(),
    updated_at: new Date(),
    files: []
  },
  loading: true,
  snackbar: { open: false, message: '', severity: 'success' },
  pagination: { page: 1, pageSize: 10, total: 0 }
};

// Reducer function
function reducer(state: RoadInfoState, action: Action): RoadInfoState {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, roadInfoData: action.payload, loading: false };
    case ActionTypes.SET_FORM:
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case ActionTypes.RESET_FORM:
      return { ...state, formData: initialState.formData };
    case ActionTypes.SET_SNACKBAR:
      return { ...state, snackbar: action.payload };
    case ActionTypes.SET_PAGINATION:
      return { ...state, pagination: action.payload };
    default:
      return state;
  }
}

type RoadInfoPageProps = {
  projectId: string;
};

const RoadInfoPage: React.FC<RoadInfoPageProps> = ({ projectId }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFormVisible, setFormVisible] = useState(false);

  console.log(projectId);

  useEffect(() => {
    dispatch({ type: ActionTypes.SET_FORM, payload: { project_id: projectId } });
  }, [projectId]);

  const refetchData = () => {
    useRoadInfoData(state.pagination, dispatch);
  };

  useRoadInfoData(state.pagination, dispatch);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: ActionTypes.SET_FORM, payload: { [name]: value } });
  };

  const handleEdit = (road: any) => {
    dispatch({ type: ActionTypes.SET_FORM, payload: road });
    setFormVisible(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      await roadInfoValidationSchema.validate(state.formData, { abortEarly: false });

      const isEdit = Boolean(state.formData.id);
      const action = isEdit
        ? roadInfoApiService.update(state.formData.id, 'roadInfoModel', {
            data: {
              ...state.formData,
              created_at: state.formData.created_at || new Date(),
              updated_at: new Date()
            },
            files: state.formData.files || null
          })
        : roadInfoApiService.create('roadInfoModel', {
            data: {
              ...state.formData,
              created_at: new Date(),
              updated_at: new Date()
            },
            files: state.formData.files || null
          });

      await action;

      dispatch({
        type: ActionTypes.SET_DATA,
        payload: isEdit
          ? state.roadInfoData.map((road) => (road.id === state.formData.id ? { ...road, ...state.formData } : road))
          : [...state.roadInfoData, state.formData]
      });

      dispatch({
        type: ActionTypes.SET_SNACKBAR,
        payload: { open: true, message: isEdit ? 'Updated successfully' : 'Created successfully', severity: 'success' }
      });

      dispatch({ type: ActionTypes.RESET_FORM, payload: {} });

      setFormVisible(false);
      toast.success(isEdit ? 'Updated successfully' : 'Created successfully');
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        validationError.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        dispatch({
          type: ActionTypes.SET_SNACKBAR,
          payload: { open: true, message: 'Operation failed', severity: 'error' }
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await roadInfoApiService.delete(id, 'roadInfoModel');
      dispatch({
        type: ActionTypes.SET_SNACKBAR,
        payload: { open: true, message: 'Deleted successfully', severity: 'success' }
      });

      // Refetch data
      refetchData();
    } catch {
      dispatch({
        type: ActionTypes.SET_SNACKBAR,
        payload: { open: true, message: 'Failed to delete', severity: 'error' }
      });
    }
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" marginBottom={3}>
        Manage Road Info
      </Typography>

      <IconButton onClick={() => setFormVisible(true)} color="primary" style={{ marginBottom: '20px' }}>
        <Icon icon="tabler:plus" fontSize="1.5rem" />
      </IconButton>

      <RoadInfoForm
        formData={state.formData}
        onFormChange={handleFormChange}
        onSubmit={handleFormSubmit}
        isVisible={isFormVisible}
        onClose={() => setFormVisible(false)}
      />

      <Box marginTop={4}>
        <Typography variant="h5" marginBottom={2}>
          Existing Road Info
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Traffic Volume</TableCell>
                <TableCell>Traffic Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.roadInfoData.map((road) => (
                <TableRow key={road.id}>
                  <TableCell>{road.material}</TableCell>
                  <TableCell>{road.location_function}</TableCell>
                  <TableCell>{road.traffic_volume}</TableCell>
                  <TableCell>{road.traffic_type}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(road)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(road.id)} style={{ color: 'red' }}>
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

export default RoadInfoPage;
