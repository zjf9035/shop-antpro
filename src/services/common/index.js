// 获取oss服务端凭证
import request from "@/utils/request"
export function ossConfig(){
    return request(`/api/auth/oss/token`)
}