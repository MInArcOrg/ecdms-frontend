import { useEffect, useRef, useState } from 'react';

// import { jsonData } from "./data.js";

// import { OrgChart } from 'd3-org-chart'
import ReactDOMServer from 'react-dom/server';
import StructureCard from './card';

const Obs = (props) => {
  const d3Container = useRef(null);

  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);

  const first = async () => {
    const { OrgChart } = await import('d3-org-chart');

    setChart(new OrgChart());
  };

  useEffect(
    () => {
      setData(props.data);
      if (data && d3Container.current) {
        if (!chart) {
          first();

          return;
        }
        chart
          .container(d3Container.current)
          .data(data)
          .nodeWidth((d) => 225)
          .nodeHeight((d) => 110)
          .initialZoom(0.7)
          .siblingsMargin((d) => 50)
          .childrenMargin((d) => 75)
          .neightbourMargin((n1, n2) => 100)
          .childrenMargin((d) => 60)
          .compactMarginBetween((d) => 35)
          .compactMarginPair((d) => 80)
          .onNodeClick((d) => {
            console.log(d, 'Id of clicked node ');
          })
          .nodeContent(function (d) {
            return ReactDOMServer.renderToStaticMarkup(<StructureCard d={d} showAvatar={props.showAvatar} />);
            // return renderToString(
            //   <div
            //     style={{
            //       fontFamily: "'Inter', sans-serif",
            //       backgroundColor: '#fff',
            //       position: 'absolute',
            //       marginTop: '-1px',
            //       marginLeft: '-1px',
            //       width: `${d.width}px`,
            //       height: `${d.height}px`,
            //       borderRadius: '10px',
            //       border: '1px solid #E4E2E9'
            //     }}
            //   >
            //     <div
            //       style={{
            //         backgroundColor: '#E4E2E9',
            //         position: 'absolute',
            //         marginTop: '-25px',
            //         marginLeft: '15px',
            //         borderRadius: '100px',
            //         width: '50px',
            //         height: '50px'
            //       }}
            //     ></div>
            //     <img
            //       src={d.data.imageUrl || '/images/avatars/no-image.png'}
            //       alt='avatar'
            //       style={{
            //         position: 'absolute',
            //         marginTop: '-20px',
            //         marginLeft: '20px',
            //         borderRadius: '100px',
            //         width: '40px',
            //         height: '40px'
            //       }}
            //     />

            //     <div
            //       style={{
            //         color: '#08011E',
            //         position: 'absolute',
            //         right: '20px',
            //         top: '17px',
            //         fontSize: '10px'
            //       }}
            //     >
            //       <i className='fas fa-ellipsis-h'></i>
            //     </div>

            //     <div
            //       style={{
            //         fontSize: '15px',
            //         color: '#08011E',
            //         marginLeft: '20px',
            //         marginTop: '32px'
            //       }}
            //     >
            //       {d.data.name}
            //     </div>
            //     <div
            //       style={{
            //         fontSize: '15px',
            //         color: '#08011E',
            //         marginLeft: '20px',
            //         marginTop: '10px'
            //       }}
            //     >
            //       Total: {d.data.total}
            //     </div>
            //     <div
            //       style={{
            //         color: '#716E7B',
            //         marginLeft: '20px',
            //         marginTop: '3px',
            //         fontSize: '10px'
            //       }}
            //     >
            //       {' '}
            //       {d.data.positionName}{' '}
            //     </div>
            //   </div>
            // )
          })
          .render();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, d3Container.current, chart]
  );

  // function addNodeWithData(nodeData) {
  //   //this function should get that values from the formik and add them as a new node
  //   //but its not working as of now
  //   //the error shows on line 492 in d3-org-chart.js
  //   console.log("index -> addNodeWithData -> nodeData");
  //   console.log(nodeData);
  //   chart.addNode(nodeData);
  // }

  // function addNode() {
  //   //this is default function that was in the example
  //   const node = {
  //     name: "New Node",
  //     nodeId: "6060",
  //     parentNodeId: "6066"
  //   };

  //   chart.addNode(node);
  // }

  // function deleteNode() {
  //   chart.removeNode(6068);
  // }

  // const [open, setOpen] = React.useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <div ref={d3Container} />
    </>
  );

  {
    /* <Grid container>
      <Grid item xs={12}> */
  }
  {
    /* <button id={"addButton"} onClick={addNode}>
          add node as root's child{" "}
          the addNode function works only when its called from this button
        </button>
        <button onClick={deleteNode}>remove node</button> */
  }

  {
    /* <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          fullScreen={fullScreen}
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: "Dav Nan",
              id: "7946",
              parentNodeId: "6066"
            }}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              console.log("add button clicked");
              addNodeWithData(values);
              resetForm();
              setSubmitting(false);
              //even if I call the default addNode function from this button, it still gives an error
              // document.getElementById("addButton").click();
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid>
                  <Grid item xs="auto">
                    <Field
                      component={TextField}
                      label="Name"
                      name="name"
                      fullWidth
                    />
                  </Grid>
                  <br />

                  <Grid item xs="auto">
                    <Field
                      component={TextField}
                      label="id"
                      name="id"
                      fullWidth
                    />
                  </Grid>
                  <br />

                  <Grid item xs="auto">
                    <Field
                      component={TextField}
                      label="parentNodeId"
                      name="parentNodeId"
                      fullWidth
                    />
                  </Grid>
                  <br />
                  <Grid item xs="auto">
                    {isSubmitting && <LinearProgress />}
                  </Grid>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Add new child
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Dialog> */
  }

  //   </Grid>
  // </Grid>
};

export default Obs;
