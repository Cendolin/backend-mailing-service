export enum Exchanges {
    MailEvents = 'mail.events'
}

export enum RoutingKeys {
    WelcomeAccount = 'user.new',
    VerifyAccount = 'user.verify',
    ResetPasswordAccount = 'user.reset_password',

    UserWilcard = 'user.*',

    Otp = 'otp',
}

export enum Queues {
    UserNotificationQueue = 'mail.notification.user.queue',
    OtpNotificationQueue = 'mail.notification.otp.queue',
}