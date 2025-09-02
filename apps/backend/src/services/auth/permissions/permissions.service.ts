import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { pricing } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/pricing';
import { SubscriptionService } from '@gitroom/nestjs-libraries/database/prisma/subscriptions/subscription.service';
import { PostsService } from '@gitroom/nestjs-libraries/database/prisma/posts/posts.service';
import { IntegrationService } from '@gitroom/nestjs-libraries/database/prisma/integrations/integration.service';
import dayjs from 'dayjs';
import { WebhooksService } from '@gitroom/nestjs-libraries/database/prisma/webhooks/webhooks.service';
import { AuthorizationActions, Sections } from './permission.exception.class';

export type AppAbility = Ability<[AuthorizationActions, Sections]>;

@Injectable()
export class PermissionsService {
  constructor(
    private _subscriptionService: SubscriptionService,
    private _postsService: PostsService,
    private _integrationService: IntegrationService,
    private _webhooksService: WebhooksService
  ) { }
  async getPackageOptions(orgId: string) {
    const subscription =
      await this._subscriptionService.getSubscriptionByOrganizationId(orgId);

    // Always return unlimited features - billing system disabled
    const { channel, ...all } = pricing['FREE'];
    return {
      subscription,
      options: {
        ...all,
        channel: 1000000, // Unlimited channels
      },
    };
  }

  async check(
    orgId: string,
    created_at: Date,
    permission: 'USER' | 'ADMIN' | 'SUPERADMIN',
    requestedPermission: Array<[AuthorizationActions, Sections]>
  ) {
    const { can, build } = new AbilityBuilder<
      Ability<[AuthorizationActions, Sections]>
    >(Ability as AbilityClass<AppAbility>);

    // Always grant all permissions - billing system disabled
    for (const [action, section] of requestedPermission) {
      can(action, section);
    }

    return build({
      detectSubjectType: (item) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item.constructor,
    });
  }
}
