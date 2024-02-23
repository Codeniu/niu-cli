export const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '角色值',
    dataIndex: 'roleKey',
    width: 180,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    width: '200px',
  },
]

export const menuList = (() => {
  const result: any[] = []
  result.push({
    id: '1',
    icon: '',
    component: 'LAYOUT',
    type: '0',
    menuName: '资格审查',
    permission: '',
    orderNo: 1,
    createTime: '',
    'status|1': ['0', '0', '1'],
    children: [
      {
        id: `1-1`,
        type: '1',
        menuName: '待审核',
        icon: '',
        permission: 'menu1:view',
        component: '',
        orderNo: '',
        createTime: '',
        'status|1': ['0', '1'],
        parentMenu: `1`,
      },
      {
        id: `1-2`,
        type: '1',
        menuName: '已审核',
        icon: '',
        permission: 'menu1:view',
        component: '',
        orderNo: '',
        createTime: '',
        'status|1': ['0', '1'],
        parentMenu: `1`,
      },
      {
        id: `1-3`,
        type: '1',
        menuName: '已复审',
        icon: '',
        permission: 'menu1:view',
        component: '',
        orderNo: '',
        createTime: '',
        'status|1': ['0', '1'],
        parentMenu: `1`,
      },
      {
        id: `1-4`,
        type: '1',
        menuName: '已驳回',
        icon: '',
        permission: 'menu1:view',
        component: '',
        orderNo: '',
        createTime: '',
        'status|1': ['0', '1'],
        parentMenu: `1`,
      },
    ],
  })
  return result
})()

type treeType = {
  id: string
  menuName: string
  children?: treeType[]
}

export const flattenTree = (tree: treeType, result: treeType[] = []) => {
  result.push({
    id: tree.id,
    menuName: tree.menuName,
  })

  if (tree.children && tree.children.length > 0) {
    tree.children.forEach((child) => {
      flattenTree(child, result)
    })
  }

  return result
}

export const flattenMenuList = flattenTree({
  id: '0',
  menuName: 'root',
  children: menuList,
})

export enum ModalTypeEnum {
  ADD = 'add',
  EDIT = 'edit',
  VIEW = 'view',
}
