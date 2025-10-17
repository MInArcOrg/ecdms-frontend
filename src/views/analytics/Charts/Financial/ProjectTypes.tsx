// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

// ** Custom Components Imports
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import { styled } from '@mui/material/styles';

const ProjectTypes = ({ data, title, maxHeight = '18.6rem', activeType, setActiveType, loading }: any) => {
  const [selected, setSelected] = useState(0);

  const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    maxHeight: maxHeight
  });

  const ScrollWrapper = ({ children, hidden }: any) => {
    if (hidden) {
      return <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: false }}>{children}</PerfectScrollbar>;
    }
  };

  return (
    <Card>
      <CardHeader
        title={title}
        // subheader={`Counter April ${new Date().getFullYear()}`}
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
      />
      {loading ? (
        <Box sx={{ height: '18.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <CardContent>
          <ScrollWrapper hidden={data?.length < 4}>
            {data?.map((item: any, index: number) => {
              return (
                <ListItem
                  key={index}
                  sx={{ padding: '0' }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ mr: 4, fontWeight: 500, color: `${item.title === selected ? '#fff' : ''}` }}>
                        {item.percentage}
                      </Typography>
                      <Box sx={{ display: 'flex', position: 'relative' }}>
                        <CircularProgress
                          size={28}
                          value={100}
                          thickness={5}
                          variant="determinate"
                          sx={{ position: 'absolute', color: (theme) => theme.palette.customColors.trackBg }}
                        />
                        <CircularProgress size={28} thickness={5} value={item.progress} variant="determinate" color={item.progressColor} />
                      </Box>
                    </Box>
                  }
                >
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
                    selected={item.id === activeType?.id}
                    onClick={() => {
                      setActiveType(item);
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        style: {
                          color: `${item.title === selected ? '#fff' : ''}`,
                          wordWrap: 'break-word',
                          maxWidth: '80%'
                        }
                      }}
                      primary={item.amount}
                      secondary={item.title.length > 17 ? `${item.title.substring(0, 17)}...` : item.title}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </ScrollWrapper>
        </CardContent>
      )}
    </Card>
  );
};

export default ProjectTypes;
