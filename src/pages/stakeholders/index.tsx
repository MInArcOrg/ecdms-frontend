import StakholdersList from 'src/views/pages/stakeholders/stakeholder-list';

const StakeholderPage = () => {
  return <StakholdersList />;
};

StakeholderPage.acl = {
  action: 'view',
  subject: 'stakeholder'
};
export default StakeholderPage;
