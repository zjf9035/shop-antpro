import request from "@/utils/request";

// 获取商品
export function fetchGoods(params) {
    return request('api/admin/goods',{params})
}

// 是否上架
export function isOn(goodsid){
    return request.patch(`/api/admin/goods/${goodsid}/on`)
}

// 是否推荐
export function isRecommend(goodsid){
    return request.patch(`/api/admin/goods/${goodsid}/recommend`)
}

// 获取分类信息
export function getCategory(){
    return request(`/api/admin/category`)
}

// 添加商品
export function addGoods(params){
    return request.post('/api/admin/goods',{params})
}