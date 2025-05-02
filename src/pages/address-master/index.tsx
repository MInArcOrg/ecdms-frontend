import AddressMasterList from 'src/views/admin/address-master/list';

const AddressMasterListPage = ({ }) => {

    return (
        <AddressMasterList />
    );
};
AddressMasterListPage.authGuard = true;
export default AddressMasterListPage;
