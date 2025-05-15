import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { Box, Typography } from '@mui/material';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';
import Link from 'next/link';
import Position from 'src/types/department/position';

const PositionCard = ({
    position,
    onEdit,
    onDelete,
    refetch,
    t
}: {
    position: Position;
    onEdit: (position: Position) => void;
    onDelete: (id: string) => void;
    refetch: () => void;
    t: any;
}) => {
    return (
        <SharedItemViewCard
            createdAt={position.created_at}
            t={t}
            actions={
                <>
                    <FileDrawer id={position.id} type="POSITION" />
                    <ModelActionComponent
                        model="Position"
                        model_id={position.id}
                        refetchModel={refetch}
                        resubmit={() => { }}
                        title=""
                        postAction={() => { }}
                    />
                    <RowOptions
                        onEdit={onEdit}
                        onDelete={() => onDelete(position.id)}
                        item={position}
                        deletePermissionRule={{ action: 'delete', subject: 'position' }}
                        editPermissionRule={{ action: 'update', subject: 'position' }}
                        options={[]}
                    />
                </>
            }
        >

            <Typography            >
                {position?.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '1rem', lineHeight: 1.5 }}>
                {position.description || t('common.not-available')}
            </Typography>
        </SharedItemViewCard >
    );
};

export default PositionCard;
