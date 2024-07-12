// components/DocumentList.tsx
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Document } from 'src/types/document';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const DocumentCard = ({
  document,
  onDetail,
  onEdit,
  onDelete,
  refetch
}: {
  document: Document;
  onDetail: (document: Document) => void;
  onEdit: (document: Document) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography
                  noWrap
                  component={Button}
                  onClick={() => onDetail(document)}
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {document.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {document.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>
                  <FileDrawer id={document.id} type={'RESOURCE'} /> &nbsp;
                  <Box sx={{ display: 'flex' }}>
                    <ModelActionComponent
                      model="Position"
                      model_id={document.id}
                      refetchModel={refetch}
                      resubmit={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                      title={''}
                      postAction={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                    <RowOptions onEdit={onEdit} onDelete={() => onDelete(document.id)} item={document} options={[]} />
                  </Box>
                </Box>
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default DocumentCard;
