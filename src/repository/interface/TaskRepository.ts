export default interface TaskRepository {
  taskById?(id: string): Promise<any>;
  taskByMacaddress?(macaddress: string): Promise<any>;
}
