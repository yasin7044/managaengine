import request from '@/axios'

export function fetchBookApi(){
    return request({
        url:'/books/',
        method:'GET'
    })
}

export function fetchChapterApi(id){
    return request({
        url:`/chapters/${id}/`,
        method:'GET'
    })
}
export function fetchBookDetailsApi(bookId){
    return request({
        url:`/books/${bookId}/`,
        method:'GET'
    })
}