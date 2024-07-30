const projectPerformaneConstant = [
  {
    from: 0,
    to: 85,
    color: '#d9d9d9',
    name: 'Poor',
    colorClass: 'error'
  },
  {
    from: 85,
    to: 95,
    color: '#ec4561',
    name: 'Below Target',
    colorClass: 'default'
  },
  {
    from: 95,
    to: 105,
    color: '#ffcc00',
    name: 'With in Target',
    colorClass: 'warning'
  },
  {
    from: 105,
    to: 115,
    color: '#02a499',
    name: 'Exceed Target',
    colorClass: 'info'
  },
  {
    from: 115,
    to: 200,
    color: '#3377ff',
    name: 'Outstanding',
    colorClass: 'success'
  }
];
export default projectPerformaneConstant;
