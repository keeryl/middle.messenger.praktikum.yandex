import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    return this.api.create(title)
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async fetchChatUsers(chatId: number) {
    return this.api.getUsers(chatId);
  }

  editAvatar(formData: FormData) {
    return this.api.editAvatar(formData)
  }

  addUserToChat(id: number, userId: number) {
    return this.api.addUsers(id, [userId]);
  }

  deleteUserFromChat(id: number, userId: number) {
    return this.api.deleteUsers(id, [userId]);
  }

  async delete(id: number) {
    return this.api.delete(id);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(chatData: Record<string, unknown>) {
    store.set('selectedChat', chatData);
  }
}


export default new ChatsController;
