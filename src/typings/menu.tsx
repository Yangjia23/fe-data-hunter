export default interface Menu {
  title: string,
  path: string,
  icon: any,
  auth: string[],
  children: Menu[]
}