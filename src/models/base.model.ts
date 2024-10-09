export interface AuthModel {
  accessToken: string
  refreshToken: string
}

export interface CodeModel {
  code: string
}

export interface TiptapContentModel {
  [key: string]: string
}
