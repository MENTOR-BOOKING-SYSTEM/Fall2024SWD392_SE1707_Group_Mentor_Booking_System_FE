export interface AuthModel {
  accessToken: string
  refreshToken: string
}

export interface CodeModel {
  code: string
}

export interface CurrentPhaseModel {
  currentPhase: string[]
}

export interface TiptapContentModel {
  [key: string]: string
}

export interface Route {
  [key: string]: {
    path: string
    bcLabel: string
  }
}
