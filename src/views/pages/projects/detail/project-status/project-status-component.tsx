import { Fragment } from "react";

const ProjectStatusComponent = () => {
    return (
        <Fragment>
            {show && (
        <ProjectStatusForm
          show={show}
          data={selectedData}
          toggleDrawer={() => setShow(!show)}
          title={t('Project Status')}
          handleFormSubmit={handleSubmit}
          loading={postLoading || putLoading}
          postError={postError || putError}
        />
      )}
      {showDetail && (
        <ProjectStatusDetail
          show={showDetail}
          data={selectedData}
          toggleDrawer={() => setShowDetail(!showDetail)}
          title={`${t('Project')} ${t('Status')} ${t('Detail')}`}
        />
      )}

      {loading && <CircularProgress sx={{ ml: '50%' }} />}
      {!loading && data?.data?.length > 0 && (
        <Card>
          <CardContent>
            <TimelineSection data={data?.data || []} onStatusClick={handleStatusClick} />
            {data?.data?.length > 0 && (
              <ActionSection
                onChangeStatusClick={handleChangeStatusClick}
                modelId={data?.data[0]?.id}
              />
            )}
          </CardContent>
        </Card>
        </Fragment>
    );
}
 
export default ProjectStatusComponent;