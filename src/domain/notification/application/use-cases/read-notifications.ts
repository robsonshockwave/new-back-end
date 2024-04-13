import { Either, left, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notification-repository';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error';

interface ReadNotificationUseCaseRequest {
  notificationId: string;
  recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(
      notificationId
    );

    if (!notification) return left(new ResourceNotFoundError());

    if (notification.recipientId.toString() !== recipientId)
      return left(new NotAllowedError());

    notification.read();

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}
