import { getInitPage } from '@keystone-next/auth/pages/InitPage';

const fieldPaths = ["name","email","password"];

export default getInitPage({"listKey":"User","fieldPaths":["name","email","password"],"enableWelcome":true});
