import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { StakeholderAccreditation } from 'src/types/stakeholder/stakeholder-accreditation';
import { useTranslation } from 'react-i18next';

interface StakeholderAccreditationCardProps {
    stakeholderAccreditation: StakeholderAccreditation;
    onEdit: (stakeholderAccreditation: StakeholderAccreditation) => void;
    onDelete: (id: string) => void;
    refetch: () => void;
}

const StakeholderAccreditationCard = ({ stakeholderAccreditation, onEdit, onDelete }: StakeholderAccreditationCardProps) => {
    const { t } = useTranslation();

    return (
        <Card sx={{ m: 1 }}>
            <CardContent>
                <Typography variant="h6">{stakeholderAccreditation.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {stakeholderAccreditation.description || t('common.not-available')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onEdit(stakeholderAccreditation)}>
                    {t('common.edit')}
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(stakeholderAccreditation.id)}>
                    {t('common.delete')}
                </Button>
            </CardActions>
        </Card>
    );
};

export default StakeholderAccreditationCard;
