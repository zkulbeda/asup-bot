export interface NextFunction {
    (err?: Error): void
}

export interface Handler <T> {
    (ctx: T, next: NextFunction): any
}

export interface ErrorHandler <T> {
    (err: Error, ctx: T, next: NextFunction): any
}

function handle (result: any, next: NextFunction) {
    if (result && typeof result.then === 'function') {
        return result.then((n)=>{
            if(n === true) return next();
        }, function (err: Error) {
            return next(err || new Error('Promise was rejected with a falsy value'))
        })
    }

    return Promise.resolve(result);
}

export function wrap <T> (fn: Handler<T>): Handler<T>
export function wrap <T> (fn: ErrorHandler<T>): ErrorHandler<T>
export function wrap <T> (fn: Handler<T> | ErrorHandler<T>): Handler<T> | ErrorHandler<T> {
    if (fn.length === 3) {
        return function (err: Error, ctx: T, next: NextFunction): any {
            return handle((fn as ErrorHandler<T>)(err, ctx, next), next)
        }
    }

    return function (ctx: T, next: NextFunction): any {
        return handle((fn as Handler<T>)(ctx, next), next)
    }
}