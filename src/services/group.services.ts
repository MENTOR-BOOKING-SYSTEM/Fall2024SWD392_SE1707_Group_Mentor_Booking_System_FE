import httpInstance from '@/lib/axios/axios'

class GroupService {
  async addMembers(groupID: number, userIDs: number[]) {
    const { data } = await httpInstance.post('/groups/add-member', { groupID, userID: userIDs })
    return data
  }

  async removeMember(groupID: number, userID: number) {
    const { data } = await httpInstance.delete('/groups/remove-member', {
      data: { groupID, userID }
    })
    return data
  }

  async assignLeader(groupID: number, userID: number) {
    const { data } = await httpInstance.patch('/groups/assign-leader', { groupID, userID })
    return data
  }

  async createGroup(groupName: string, userIDs: number[]) {
    const { data } = await httpInstance.post('/groups/', { groupName, usersID: userIDs })
    return data
  }

  async getGroupMembers(groupID: number) {
    const { data } = await httpInstance.get(`/groups/${groupID}/get-list-users`)
    return data
  }
}

const groupService = new GroupService()
export default groupService
