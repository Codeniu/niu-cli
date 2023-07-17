/**
 * @description: 审核状态
 */
export enum ReviewResult {
  UNREVIEWED = '0', // 未审核
  APPROVED = '1', // 审核通过
  REJECTED = '2', // 驳回
  TOPASS = '3', // 摘牌公关中
}

/**
 * @description: 摘牌状态
 * 0 待摘牌 1 已摘牌 2 待验收 3 已攻关 4 攻关失败
 */
export enum DelistingStatus {
  PUBLISHED = '0',
  DELISTED = '1',
  SUBMITTED = '2',
  RESOLVED = '3',
  FAILED = '4',
}
