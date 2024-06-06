import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import NoticeForm from './notice-form';
import useNotice from 'src/hooks/team/notice-hook';
import Notice from 'src/types/team/notice';

interface NoticeDrawerType {
  open: boolean;
  toggle: () => void;
  addNewNotice: (body: { data: Notice; files: [] }) => Promise<void>;
  refetch: () => void;
  notice: Notice;
  parentNoticeId?: string;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required()
});

const NoticeDrawer = (props: NoticeDrawerType) => {
  // ** Props
  const { open, toggle, refetch, notice } = props;

  const { addNewNotice, updateNotice } = useNotice() as ReturnType<typeof useNotice>;

  const isEdit = notice?.id ? true : false;

  const getPayload = (values: Notice) => {
    const payload = {
      data: {
        id: notice?.id,
        title: values.title,
        content: values.content
      },
      files: []
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer title={isEdit ? 'edit-notice' : 'create-notice'} handleClose={handleClose} open={open}>
      {() =>
        notice && (
          <FormPageWrapper
            edit={isEdit}
            title="notice"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={notice as Notice}
            createActionFunc={isEdit ? updateNotice : addNewNotice}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Notice>) => {
              return <NoticeForm formik={formik} defaultLocaleData={{} as Notice} />;
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default NoticeDrawer;
