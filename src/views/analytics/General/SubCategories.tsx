// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

// ** Custom Components Imports
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import OptionsMenu from 'src/@core/components/option-menu';

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: '30rem'
});

const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden?: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>;
  }
};

const GeneralSubCategories = ({ data }: { data: any[] }) => {
  const [selected, setSelected] = useState(0);

  return (
    <Card>
      <CardHeader
        title="Sub Categories"
        subheader={`Counter April ${new Date().getFullYear()}`}
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <CardContent>
        <ScrollWrapper>
          {data.map((item, index) => {
            return (
              <ListItem
                key={item.title}
                sx={{ padding: '0' }}
                secondaryAction={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        mr: 4,
                        fontWeight: 500,
                        color: `${item.title === selected ? '#fff' : ''}`
                      }}
                    >
                      {item.percentage}
                    </Typography>
                    <Box sx={{ display: 'flex', position: 'relative' }}>
                      <CircularProgress
                        size={28}
                        value={100}
                        thickness={5}
                        variant="determinate"
                        sx={{
                          position: 'absolute',
                          color: (theme) => theme.palette.customColors.trackBg
                        }}
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
                  selected={item.title === selected}
                  onClick={() => {
                    setSelected(item.title);
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      style: {
                        color: `${item.title === selected ? '#fff' : ''}`,
                        wordWrap: 'break-word',
                        maxWidth: '95%'
                      }
                    }}
                    primary={item.title}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </ScrollWrapper>
      </CardContent>
    </Card>
  );
};

export default GeneralSubCategories;
