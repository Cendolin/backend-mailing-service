import { handlerManager } from "../managers/handlerManager"
import type { Task } from "../tasks/base";
import { DeliveryNewUserMail } from "../tasks/deliveryNewUserMail"
import { DeliveryResetPasswordMail } from "../tasks/deliveryResetPasswordMail";
import { DeliveryVerifyAccountMail } from "../tasks/deliveryVerifyAccountMail";

export const TaskApp = async () => {
    handlerManager.register(new DeliveryNewUserMail() as Task<any>);
    handlerManager.register(new DeliveryVerifyAccountMail() as Task<any>);
    handlerManager.register(new DeliveryResetPasswordMail() as Task<any>);
}
