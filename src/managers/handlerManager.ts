import type { Type } from "arktype";
import type { Task } from "../tasks/base";
import { safeJsonParse } from "../utils/safeJsonParse";

/**
 * @class HandlerManager
 */
export class HandlerManager {
    /**
     * Task list
     * @type {Map<string, HandlerTaskFunc>}
     */
    protected tasks: Map<string, Task<Type>> = new Map();

    public async load(taskName: string, content: string) {
        const task = this.tasks.get(taskName);
        if (!task) {
            throw new Error(`Missing task: ${taskName}`);
        }

        const json = safeJsonParse(content);
        task.validate(json);

        return task.handler(json as Type);
    }

    public register(task: Task<Type>) {
        if (this.tasks.has(task.name)) {
            throw new Error(`Task already registered: ${task.name}`);
        }

        this.tasks.set(task.name, task);
    }
}

export const handlerManager = new HandlerManager();