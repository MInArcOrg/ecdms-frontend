import { Collapse, Typography } from '@mui/material';
import { Fragment, useState } from 'react';

function DescCollapse({ desc }: { desc: string }) {
  const [collapse, setCollapse] = useState(false);

  return (
    <Fragment>
      {!collapse ? (
        <Typography variant="body1">
          {desc?.substr(0, 10)}

          {desc?.length > 10 && (
            <Fragment>
              <span>... </span>
              <Typography sx={{ cursor: 'pointer' }} variant="body2" component="span" color="primary" onClick={() => setCollapse(true)}>
                Show More
              </Typography>
            </Fragment>
          )}
        </Typography>
      ) : (
        <Collapse in={collapse} timeout="auto" unmountOnExit component="span">
          <Typography variant="body1">{desc}</Typography>
          <Typography sx={{ cursor: 'pointer' }} variant="body2" color="primary" onClick={() => setCollapse(false)}>
            Show Less
          </Typography>
        </Collapse>
      )}
    </Fragment>
  );
}

export default DescCollapse;
