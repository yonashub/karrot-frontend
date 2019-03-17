<template>
  <QBanner
    v-if="user && !hasEmailVerified"
    icon="fas fa-exclamation-triangle"
    color="warning"
  >
    <p>{{ $t('NOTIFICATIONS.NOT_VERIFIED', { email: user.unverifiedEmail }) }}</p>
    <p>{{ $t('WALL.VERIFY_EMAIL_FOR_NOTIFICATIONS') }}</p>
    <i18n
      v-if="!success"
      path="NOTIFICATIONS.CHECK_YOUR_MAILS"
      tag="span"
    >
      <a
        place="resend"
        @click="resend"
        class="underline"
      >
        {{ $t('NOTIFICATIONS.RESEND_VERIFICATION') }}
      </a>
    </i18n>
    <p v-else>
      {{ $t('NOTIFICATIONS.VERIFICATION_EMAIL_SENT') }}
    </p>
    <p
      v-if="hasAnyError"
      class="bg-white text-negative"
    >
      <i class="fas fa-exclamation-triangle"/>
      {{ anyFirstError }}
    </p>
  </QBanner>
  <QExpansionItem
    v-else-if="hasFailedEmailDeliveries"
    header-class="bg-warning text-white"
  >
    <template
      slot="header"
    >
      <QItemSide
        color="white"
        icon="fas fa-exclamation-triangle"
      />
      <QItemMain
        :label="failedEmailDeliveryMessage"
      />
    </template>
    <QList>
      <QItem
        v-for="(event, idx) in failedEmailDeliveries"
        :key="idx"
      >
        <QItemMain
          :label="event.subject"
          :sublabel="`${event.event}: ${event.reason}`"
        />
        <QItemSide
          right
          :stamp="$d(event.createdAt, 'long')"
        />
      </QItem>
    </QList>
  </QExpansionItem>
</template>

<script>
import { QBanner, QList, QItem, QItemMain, QItemSide, QExpansionItem } from 'quasar'
import { mapActions, mapGetters } from 'vuex'
import statusMixin from '@/utils/mixins/statusMixin'

export default {
  components: {
    QBanner, QList, QItem, QItemMain, QItemSide, QExpansionItem,
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      failedEmailDeliveries: 'auth/failedEmailDeliveries',
      status: 'users/resendVerificationCodeStatus',
      success: 'users/resendVerificationCodeSuccess',
    }),
    ...statusMixin.computed,
    hasEmailVerified () {
      return this.user && this.user.mailVerified
    },
    hasFailedEmailDeliveries () {
      return this.failedEmailDeliveries.length > 0
    },
    failedEmailDeliveryMessage () {
      const count = this.failedEmailDeliveries.length
      if (count > 0) {
        const countString = count >= 10 ? (count + '+') : count
        return this.$tc('NOTIFICATIONS.EMAIL_NOT_DELIVERED', count, { count: countString })
      }
    },
  },
  methods: {
    ...mapActions({
      resend: 'users/resendVerificationCode',
    }),
  },
}
</script>

<style scoped lang="stylus">
.underline
  text-decoration underline
  cursor pointer
</style>
