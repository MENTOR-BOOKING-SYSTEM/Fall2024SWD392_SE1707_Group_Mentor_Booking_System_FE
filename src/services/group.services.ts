import httpInstance from '@/lib/axios/axios'

class GroupService {
  async addMembers(groupID: number, userIDs: number[]) {
    const { data } = await httpInstance.post('/groups/add-member', { groupID, userID: userIDs })
    return data
  }

  async removeMember(groupID: number, userID: number) {
    const { data } = await httpInstance.post('/groups/remove-member', { groupID, userID })
    return data
  }

  async createGroup(groupName: string, userIDs: number[]) {
    const { data } = await httpInstance.post('/groups/', { groupName, userID: userIDs })
    return data
  }
}

const groupService = new GroupService()
export default groupService
