// components/MasterTypeList.tsx
import { Card, CardContent, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react';
import Translations from 'src/layouts/components/Translations';
import { MasterCategory, MasterType } from 'src/types/master/master-types';

interface MasterTypeListProps {
  types: MasterCategory[];
  selectedType: MasterType | null;
  onTypeSelect: (id: string) => void;
}

const MasterTypeList: React.FC<MasterTypeListProps> = ({ types, selectedType, onTypeSelect }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Translations text="Types" />
        </Typography>
        <List component="nav">
          {types.map((type) => (
            <ListItemButton
              sx={{
                borderRadius: '0.5rem',
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',

                  '&:hover': {
                    backgroundColor: 'primary.light'
                  }
                }
              }}
              key={type.id}
              selected={type.id === selectedType?.id}
              onClick={() => onTypeSelect(type.id)}
            >
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    color: `${type?.id === selectedType?.id ? '#fff' : ''}`,
                    wordWrap: 'break-word',
                    maxWidth: '95%'
                  }
                }}
                primary={type.name}
              />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default MasterTypeList;
