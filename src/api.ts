import axios from 'axios'

export default {
  account: {
    /**
     * 用户删除财务帐号
     * @explain 参数, account{id}
     */
    postDeleteAccount(data: AccountParam): Promise<any> {
      const method = 'post'
      return axios('/account/deleteAccount', { method, data })
    },
    /**
     * 用户添加财务帐号
     * @explain 参数, account{type:类型(  1微信收款码,paymentcode:收款码图片  2支付宝,account:支付宝帐号,username:姓名  3银行卡,bank:银行名字,cardnumber:卡号,username:姓名)};
     */
    postUserAddAccount(data: AccountParam): Promise<any> {
      const method = 'post'
      return axios('/account/userAddAccount', { method, data })
    },
    /**
     * 用户获取财务帐号
     * @explain 参数, 无
     */
    postUserGetAccount(data: AccountParam): Promise<any> {
      const method = 'post'
      return axios('/account/userGetAccount', { method, data })
    },
  },
  admin: {
    /**
     * 管理员修改密码
     * @explain 参数, admin{adminname:帐号,password:密码};  newPassword:新密码
     */
    postChangePassword(data: AdminParam): Promise<any> {
      const method = 'post'
      return axios('/admin/changePassword', { method, data })
    },
    /**
     * 管理员登录
     * @explain 参数, admin{adminname:帐号,password:密码};
     */
    postLogin(data: AdminParam): Promise<any> {
      const method = 'post'
      return axios('/admin/login', { method, data })
    },
    /** 管理员注销 */
    postLogout(): Promise<any> {
      const method = 'post'
      return axios('/admin/logout', { method })
    },
  },
  assets: {
    /**
     * 根据id获取资产明细
     * @explain 参数, record{id}
     */
    postGetAssetsRecordById(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/getAssetsRecordById', { method, data })
    },
    /**
     * 财务统计
     * @explain 参数, starttime:开始时间;endtime:结束时间
     */
    postGetFinancialData(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/getFinancialData', { method, data })
    },
    /**
     * 交易订单统计
     * @explain 参数, starttime:开始时间;endtime:结束时间
     */
    postGetOrderData(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/getOrderData', { method, data })
    },
    /**
     * 派出红包统计
     * @explain 参数, starttime:开始时间;endtime:结束时间
     */
    postGetRedPaperData(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/getRedPaperData', { method, data })
    },
    /**
     * 提现统计
     * @explain 参数, starttime:开始时间;endtime:结束时间
     */
    postGetWithdrawData(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/getWithdrawData', { method, data })
    },
    /**
     * 获取昨日收益
     * @explain 参数, 无
     */
    postGetYesterdayIncome(): Promise<any> {
      const method = 'post'
      return axios('/assets/getYesterdayIncome', { method })
    },
    /**
     * 分页获取资产明细
     * @explain 参数, record{type:类型(1转入2转出3收益)};  page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postPageAssetsRecord(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/pageAssetsRecord', { method, data })
    },
    /**
     * 分页获取收益
     * @explain 参数, page{size:每页条数,indexPageNum:当前页码}
     */
    postPageIncome(data: AssetsParam): Promise<any> {
      const method = 'post'
      return axios('/assets/pageIncome', { method, data })
    },
  },
  banner: {
    /**
     * 添加轮播
     * @explain 参数, banner{image:轮播图片};
     */
    postAddBanner(data: BannerParam): Promise<any> {
      const method = 'post'
      return axios('/banner/addBanner', { method, data })
    },
    /**
     * 删除轮播
     * @explain 参数, banner{id};
     */
    postDeleteBanner(data: BannerParam): Promise<any> {
      const method = 'post'
      return axios('/banner/deleteBanner', { method, data })
    },
    /**
     * 获取所有轮播
     * @explain 参数, 无
     */
    postGetAllBanner(): Promise<any> {
      const method = 'post'
      return axios('/banner/getAllBanner', { method })
    },
  },
  product: {
    /**
     * 买入产品
     * @explain 参数, product{id};   money:金额;   sharerId:分享者id(可空)
     */
    postBuyProduct(data: ProductParam): Promise<any> {
      const method = 'post'
      return axios('/product/buyProduct', { method, data })
    },
    /**
     * 随便买入产品(测试用，上线关闭)
     * @explain 参数, product{id};   money:金额;   sharerId:分享者id(可空)
     */
    postBuyProductFree(data: ProductParam): Promise<any> {
      const method = 'post'
      return axios('/product/buyProductFree', { method, data })
    },
    /**
     * 编辑产品
     * @explain 参数, product{id,   name:产品名称, startmoney:起购金额, incrementmoney:递增金额, settlementway:结算方式, settlementrule:结算规则, tips:温馨提示, tradingrule:交易规则, tradingagreement:交易协议, introduction:产品介绍};
     */
    postEditProduct(data: ProductParam): Promise<any> {
      const method = 'post'
      return axios('/product/editProduct', { method, data })
    },
    /**
     * 根据id获取订单详情
     * @explain 参数, order{id}
     */
    postGetOrderById(data: ProductParam): Promise<any> {
      const method = 'post'
      return axios('/product/getOrderById', { method, data })
    },
    /**
     * 获取产品信息
     * @explain 参数, 无
     */
    postGetProduct(): Promise<any> {
      const method = 'post'
      return axios('/product/getProduct', { method })
    },
    /**
     * 分页获取订单(管理端)
     * @explain 参数, order{orderno:订单号};   page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postPageOrder(data: ProductParam): Promise<any> {
      const method = 'post'
      return axios('/product/pageOrder', { method, data })
    },
    /**
     * 用户分页获取订单(用户端)
     * @explain 参数,  page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postUserPageOrder(data: ProductParam): Promise<any> {
      const method = 'post'
      return axios('/product/userPageOrder', { method, data })
    },
  },
  share: {
    /**
     * 审核分享赚提现记录
     * @explain 参数, withdraw{id}
     */
    postCheckWithdraw(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/checkWithdraw', { method, data })
    },
    /**
     * 编辑分享活动结束时间
     * @explain 参数,
     */
    postEditShareEndtime(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/editShareEndtime', { method, data })
    },
    /**
     * 获取分享活动结束时间
     * @explain 参数,
     */
    postGetShareEndtime(): Promise<any> {
      const method = 'post'
      return axios('/share/getShareEndtime', { method })
    },
    /**
     * 根据id获取分享赚提现记录
     * @explain 参数, withdraw{id}
     */
    postGetWithdrawById(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/getWithdrawById', { method, data })
    },
    /**
     * 分页获取分享赚提款记录(管理端)
     * @explain 参数, withdraw{status:状态(1提款中2提款完成),username,account,bank,cardnumber(模糊搜索)}  page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postPageWithdraw(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/pageWithdraw', { method, data })
    },
    /**
     * 用户获取分享赚钱包
     * @explain 参数,
     */
    postUserGetSharer(): Promise<any> {
      const method = 'post'
      return axios('/share/userGetSharer', { method })
    },
    /**
     * 用户分页获取分享赚明细
     * @explain 参数, page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postUserPageShareRecord(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/userPageShareRecord', { method, data })
    },
    /**
     * 用户分页获取分享赚提款记录
     * @explain 参数, withdraw{status:状态(1提款中2提款完成)}  page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postUserPageWithdraw(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/userPageWithdraw', { method, data })
    },
    /**
     * 用户提现分享赚
     * @explain 参数, accountid:财务帐号id;  money:提现金额
     */
    postUserShareWithdraw(data: ShareParam): Promise<any> {
      const method = 'post'
      return axios('/share/userShareWithdraw', { method, data })
    },
  },
  uploadFile: {
    /**
     * 上传文件接口
     * @explain 图片路径：ip:端口/upload/file/图片名称
     */
    post(formData: { file: any }): Promise<any> {
      const method = 'post'
      const data = new FormData()
      for(let name in formData)
        data.append(name, (formData as any)[name])
      return axios('/uploadFile', { method, data })
    },
  },
  user: {
    /**
     * 根据id获取用户信息
     * @explain 参数, user{id}
     */
    postGetUserById(data: UserParam): Promise<any> {
      const method = 'post'
      return axios('/user/getUserById', { method, data })
    },
    /**
     * 微信网页授权登录
     * @explain 参数, code,state,sharerId:分享者id
     */
    getOauthLogin(params: { code?: string, sharerId?: number, state?: string }): Promise<any> {
      const method = 'get'
      return axios('/user/oauthLogin', { method, params })
    },
    /**
     * 分页获取用户
     * @explain 参数, user{nickname:昵称,username:姓名,phone:手机号,idcard:身份证};   page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postPageUser(data: UserParam): Promise<any> {
      const method = 'post'
      return axios('/user/pageUser', { method, data })
    },
    /**
     * 用户编辑资料
     * @explain 参数, user{username:姓名,phone:手机号,idcard:身份证};
     */
    postUserEditInfo(data: UserParam): Promise<any> {
      const method = 'post'
      return axios('/user/userEditInfo', { method, data })
    },
    /**
     * 用户获取自己的资料
     * @explain 参数, 无
     */
    postUserGetInfo(): Promise<any> {
      const method = 'post'
      return axios('/user/userGetInfo', { method })
    },
  },
  wechat: {
    /**
     * 获取配置参数
     * @explain 参数, url:当前页面url
     */
    postGetConfig(data: WxParam): Promise<any> {
      const method = 'post'
      return axios('/wechat/getConfig', { method, data })
    },
  },
  withdraw: {
    /**
     * 审核提款记录
     * @explain 参数, withdraw{id}
     */
    postCheckWithdraw(data: WithdrawParam): Promise<any> {
      const method = 'post'
      return axios('/withdraw/checkWithdraw', { method, data })
    },
    /**
     * 根据id获取提现记录
     * @explain 参数, withdraw{id}
     */
    postGetWithdrawById(data: WithdrawParam): Promise<any> {
      const method = 'post'
      return axios('/withdraw/getWithdrawById', { method, data })
    },
    /**
     * 分页获取提款记录(管理端)
     * @explain 参数, withdraw{status:状态(1提款中2提款完成),username,account,bank,cardnumber(模糊搜索)}  page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postPageWithdraw(data: WithdrawParam): Promise<any> {
      const method = 'post'
      return axios('/withdraw/pageWithdraw', { method, data })
    },
    /**
     * 用户分页获取提款记录
     * @explain 参数, withdraw{status:状态(1提款中2提款完成)}  page{size:每页条数,indexPageNum:当前页码,sortFieldNames:排序字段(["createtime"]),order:正倒序}
     */
    postUserPageWithdraw(data: WithdrawParam): Promise<any> {
      const method = 'post'
      return axios('/withdraw/userPageWithdraw', { method, data })
    },
    /**
     * 用户发起提现
     * @explain 参数, accountid:账户id;  part:提现部分(1一个月内 2三个月内 3半年内 4一年内 5一年以上);  money:提现金额
     */
    postUserWithdraw(data: WithdrawParam): Promise<any> {
      const method = 'post'
      return axios('/withdraw/userWithdraw', { method, data })
    },
  },
}

export interface AccountParam {
  account?: AccountPo
}
export interface AccountPo {
  account?: string
  bank?: string
  cardnumber?: string
  createtime?: string
  edittime?: string
  id?: number
  isdelete?: boolean
  islockup?: boolean
  paymentcode?: string
  type?: number
  userid?: number
  username?: string
}
export interface AdminParam {
  admin?: AdminPo
  newPassword?: string
}
export interface AdminPo {
  adminname?: string
  createtime?: string
  edittime?: string
  id?: number
  isdelete?: boolean
  islockup?: boolean
  password?: string
  salt?: string
}
export interface AssetsParam {
  endtime?: string
  page?: PageinfoPo
  record?: AssetsRecordPo
  starttime?: string
}
export interface AssetsRecordPo {
  createtime?: string
  edittime?: string
  id?: number
  isdelete?: boolean
  islockup?: boolean
  money?: number
  totalmoney?: number
  type?: number
  userid?: number
}
export interface BannerParam {
  banner?: BannerPo
}
export interface BannerPo {
  createtime?: string
  edittime?: string
  id?: number
  image?: string
  isdelete?: boolean
  islockup?: boolean
}
export interface Comparable {
}
export interface OrderPo {
  createtime?: string
  edittime?: string
  id?: number
  isdelete?: boolean
  islockup?: boolean
  money?: number
  orderno?: string
  status?: number
  userid?: number
}
export interface PageinfoPo {
  indexPageNum?: number
  order?: boolean
  ranges?: RangePo[]
  size?: number
  sortFieldNames?: string[]
}
export interface ProductParam {
  money?: number
  order?: OrderPo
  page?: PageinfoPo
  product?: ProductPo
  sharerId?: number
}
export interface ProductPo {
  createtime?: string
  edittime?: string
  id?: number
  incrementmoney?: number
  introduction?: string
  isdelete?: boolean
  islockup?: boolean
  maxrate?: number
  name?: string
  settlementrule?: string
  settlementway?: string
  startmoney?: number
  tips?: string
  tradingagreement?: string
  tradingrule?: string
  yearrate?: number
}
export interface RangePo {
  field?: string
  from?: Comparable
  to?: Comparable
}
export interface ResultMessage {
  code?: number
  data?: object
  message?: string
}
export interface ShareParam {
  accountid?: number
  endtime?: string
  money?: number
  page?: PageinfoPo
  withdraw?: ShareWithdrawPo
}
export interface ShareWithdrawPo {
  account?: string
  arrivaltime?: string
  bank?: string
  cardnumber?: string
  createtime?: string
  edittime?: string
  id?: number
  isdelete?: boolean
  islockup?: boolean
  money?: number
  paymentcode?: string
  status?: number
  userid?: number
  username?: string
  way?: number
}
export interface UserParam {
  code?: string
  page?: PageinfoPo
  state?: string
  user?: UserPo
}
export interface UserPo {
  createtime?: string
  edittime?: string
  headimgurl?: string
  id?: number
  idcard?: string
  isdelete?: boolean
  islockup?: boolean
  nickname?: string
  openid?: string
  phone?: string
  sex?: number
  username?: string
}
export interface WithdrawParam {
  accountid?: number
  money?: number
  page?: PageinfoPo
  part?: number
  withdraw?: WithdrawPo
}
export interface WithdrawPo {
  account?: string
  arrivaltime?: string
  bank?: string
  cardnumber?: string
  createtime?: string
  edittime?: string
  estimatetime?: string
  handlingfee?: number
  id?: number
  income?: number
  isdelete?: boolean
  islockup?: boolean
  money?: number
  paymentcode?: string
  status?: number
  totalmoney?: number
  userid?: number
  username?: string
  way?: number
}
export interface WxParam {
  url?: string
}
