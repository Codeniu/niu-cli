export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 65,
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName',
    width: 160,
  },
  {
    title: '描述',
    dataIndex: 'deptDesc',
    key: 'deptDesc',
  },
  {
    title: '属性 ',
    dataIndex: 'deptFlag',
    key: 'deptFlag',
    width: 140,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    width: '200px',
  },
]

export enum ModalTypeEnum {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view',
}
