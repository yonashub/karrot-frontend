/**
 * These factories are supposed to mimick enriched objects, similar to those that can be retrieved from vuex
 * This is useful for:
 * 1. get props for components tests
 * 2. verify getter output in tests for vuex modules
 *
 * The implementations are not complete, so if you miss a property that you need, please add it!
 */
import cloneDeep from 'clone-deep'
import addDays from 'date-fns/addDays'
import addMinutes from 'date-fns/addMinutes'
import subDays from 'date-fns/subDays'
import subHours from 'date-fns/subHours'

// Reusing the landing page images :)

import imageLarge from '@/base/pages/images/app-screenshots-browser/karrot-screenshot-browser-1776.png'
import imageFeatureB from '@/base/pages/images/feature-screenshots/karrot-feature-activities-978.png'
import imageFeatureA from '@/base/pages/images/feature-screenshots/karrot-feature-groups-978.png'
import imageFeatureC from '@/base/pages/images/feature-screenshots/karrot-feature-offers-978.png'
import imageRandomC from '@/base/pages/images/random-imgs/bike-workshop-200.jpg'
import imageRandomE from '@/base/pages/images/random-imgs/fsmaastricht-fairshare-200.jpg'
import imageRandomF from '@/base/pages/images/random-imgs/fsmaastricht-foodsavers-200.jpg'
import imageRandomA from '@/base/pages/images/random-imgs/oestersund-saved-food-200.jpg'
import imageRandomB from '@/base/pages/images/random-imgs/oestersund-volunteers-200.jpg'
import imageRandomD from '@/base/pages/images/random-imgs/solikyl-savers-200.jpg'
import { optionsFor } from '@/places/placeStatus'

import { statusMocks } from '>/helpers'

let notificationIdCnt = 0
export const makeNotification = data => {
  return {
    id: notificationIdCnt++,
    type: 'new_applicant',
    createdAt: new Date(),
    expiresAt: null,
    clicked: false,
    context: {},
    ...data,
  }
}

let applicationIdCnt = 0
export const makeApplication = data => {
  return {
    id: applicationIdCnt++,
    createdAt: subDays(new Date(), 1),
    user: makeUser(),
    group: makeGroup(),
    questions: 'What are your motivations for joining slköaslkfjasdfasfd?',
    answers: 'I can live off fire!',
    status: 'pending',
    decidedBy: null,
    decidedAt: null,
    isPending: true,
    canDecide: true,
    ...data,
  }
}

let groupIdCnt = 0
export const makeGroup = data => {
  const id = groupIdCnt++
  return {
    id,
    name: `Group ${id}`,
    description: '',
    welcomeMessage: '',
    publicDescription: '',
    applicationQuestions: 'Why do **you** want to join our group?',
    applicationQuestionsDefault: '',
    members: [],
    memberships: {},
    address: '',
    latitude: 0,
    longitude: 0,
    timezone: 'Europe/Berlin',
    status: 'active',
    theme: 'foodsaving',
    features: ['offers'],
    notificationTypes: [
      'weekly_summary',
      'daily_activity_notification',
      'new_application',
    ],
    isOpen: false,
    trustThresholdForNewcomer: 1,
    memberInactiveAfterDays: 30,
    issueVotingDurationDays: 7,
    photoUrls: {},
    isPlayground: false,
    isBikeKitchen: false,
    isGeneralPurpose: false,
    hasPhoto: false,
    hasLocation: false,
    membership: {},
    ...data,
  }
}

export const makeGroupInfo = data => {
  const id = groupIdCnt++
  return {
    id,
    name: `Group ${id}`,
    publicDescription: 'our public description',
    applicationQuestions: 'Why do **you** want to join our group?',
    address: '',
    latitude: 0,
    longitude: 0,
    memberCount: 1,
    isMember: false,
    status: 'active',
    theme: 'foodsaving',
    isOpen: false,
    photoUrls: {},
    distance: null,
    isCurrentGroup: false,
    isPlayground: false,
    isInactive: false,
    myApplicationPending: false,
    hasPhoto: false,
    saveStatus: statusMocks.default(),
    joinStatus: statusMocks.default(),
    leaveStatus: statusMocks.default(),
    ...data,
  }
}

export const makeMembership = data => {
  return {
    createdAt: new Date(),
    addedBy: null,
    roles: [
      'editor',
    ],
    active: true,
    isEditor: false,
    trustedBy: [],
    trustThresholdForNewcomer: 3,
    trusted: false,
    trustProgress: 0,
    trustUserStatus: statusMocks.default(),
    ...data,
  }
}

let userIdCnt = 1
export const makeUser = data => {
  const id = userIdCnt++
  return {
    id,
    displayName: `User ${id}`,
    photoUrls: {},
    latitude: null,
    longitude: null,
    membership: null,
    ...data,
  }
}

export const makeUserProfile = data => {
  return {
    ...makeUser(),
    email: 'foo@foo.com',
    mobileNumber: '',
    address: '',
    description: '',
    groups: [],
    ...data,
  }
}

export const makeCurrentUser = data => {
  return {
    ...makeUserProfile(),
    unverifiedEmail: 'foo@foo.com',
    mailVerified: true,
    currentGroup: 1,
    language: 'en',
    isCurrentUser: true,
    ...data,
  }
}

let placeIdCnt = 1
export const makePlace = data => {
  const id = placeIdCnt++
  const place = {
    id,
    name: `Place ${id}`,
    description: '',
    group: null,
    address: '',
    latitude: 0,
    longitude: 0,
    weeksInAdvance: 4,
    status: 'active',
    isActivePlace: false,
    isSubscribed: false,
    statistics: null,
    saveStatus: statusMocks.default(),
    conversationUnreadCount: 0,
    ...data,
  }
  return {
    ...place,
    ui: optionsFor(place),
  }
}

export const makePlaceStatistics = data => {
  return {
    feedbackCount: 4,
    feedbackWeight: 10,
    activitiesDone: 10,
    ...data,
  }
}

export const participantType = {
  role: 'member',
  maxParticipants: 4,
  description: 'normal member',
}

export const participantTypes = [
  participantType,
]

let activityTypeIdCnt = 0
export const activityTypes = {
  pickup: {
    id: activityTypeIdCnt++,
    name: 'Pickup',
    status: 'active',
    translatedName: 'Pickup',
    colour: '007700',
    icon: 'fas fa-shopping-basket',
    feedbackIcon: 'fas fa-balance-scale',
    hasFeedback: true,
    hasFeedbackWeight: true,
    saveStatus: statusMocks.default(),
  },
}

let activityIdCnt = 0
export const makeActivity = data => {
  return {
    id: activityIdCnt++,
    activityType: activityTypes.pickup,
    date: new Date(),
    dateEnd: addMinutes(new Date(), 30),
    series: null,
    place: null,
    maxParticipants: 10,
    participants: [],
    feedbackGivenBy: [],
    feedbackDismissedBy: [],
    hasStarted: false,
    description: '',
    isDisabled: false,
    hasDuration: false,
    isUserMember: false,
    isEmpty: true,
    isFull: false,
    saveStatus: statusMocks.default(),
    leaveStatus: statusMocks.default(),
    joinStatus: statusMocks.default(),
    participantTypes: cloneDeep(participantTypes),
    ...data,
  }
}

let activitySeriesIdCnt = 0
export const makeActivitySeries = data => {
  return {
    id: activitySeriesIdCnt++,
    activityType: activityTypes.pickup,
    place: null,
    maxParticipants: 10,
    startDate: new Date(),
    description: '',
    datesPreview: [],
    destroyStatus: statusMocks.default(),
    saveStatus: statusMocks.default(),
    duration: null,
    isSameHour: true,
    isSameMinute: true,
    isSameWeekday: true,
    activities: [],
    rule: {
      byDay: ['TU'],
      custom: 'FREQ=WEEKLY;BYDAY=TU',
      freq: 'WEEKLY',
      isCustom: false,
    },
    participantTypes: cloneDeep(participantTypes),
    ...data,
  }
}

let feedbackIdCnt = 0
export const makeFeedback = data => {
  const group = data.group || makeGroup()
  const place = data.place || makePlace({ group })
  return {
    id: feedbackIdCnt++,
    weight: feedbackIdCnt * 10,
    comment: `feedback ${feedbackIdCnt}`,
    about: makeActivity({ place }),
    givenBy: makeUser(),
    createdAt: new Date(),
    isEditable: false,
    place,
    group,
    ...data,
  }
}

let optionIdCnt = 0
export const makeOption = data => {
  return {
    id: optionIdCnt++,
    sumScore: null,
    yourScore: 0,
    meanScore: null,
    type: 'further_discussion',
    ...data,
  }
}

let votingIdCnt = 0
export const makeVoting = data => {
  return {
    id: votingIdCnt++,
    acceptedOption: 74,
    expiresAt: addDays(new Date(), 7),
    options: [
      makeOption({
        type: 'further_discussion',
      }),
      makeOption({
        type: 'remove_user',
      }),
      makeOption({
        type: 'no_change',
      }),
    ],
    participantCount: 6,
    ...data,
  }
}

let issueIdCnt = 0
export const makeIssue = data => {
  return {
    id: issueIdCnt++,
    createdAt: subDays(new Date(), 7 + 6),
    topic: 'I complain about this user',
    createdBy: makeUser(),
    affectedUser: makeUser(),
    group: makeGroup(),
    status: 'ongoing',
    isCancelled: false,
    isOngoing: true,
    votings: [
      makeVoting({
        expiresAt: subDays(new Date(), 7 + 6),
      }),
      makeVoting({
        expiresAt: subDays(new Date(), 6),
      }),
      makeVoting({
        expiresAt: addDays(new Date(), 1),
      }),
    ],
    ...data,
  }
}

let historyIdCnt = 0
export const makeHistory = data => {
  return {
    id: historyIdCnt++,
    date: subHours(new Date(), 26),
    typus: 'GROUP_CHANGE_PHOTO',
    group: makeGroup(),
    users: [
      makeUser(),
    ],
    store: null,
    message: 'Changed the group picture',
    ...data,
  }
}

export const makeReaction = date => {
  return {
    name: 'thumbsup',
    users: [makeUser()],
    reacted: false,
    message: 'a reacted with :thumbsup:',
    ...date,
  }
}

let messageIdCnt = 0
export const makeMessage = data => {
  const id = messageIdCnt++
  return {
    id,
    content: `hello ${id}!`,
    author: makeUser(),
    createdAt: new Date(),
    updatedAt: new Date(),
    editedAt: new Date(),
    receivedVia: '',
    isEditable: false,
    reactions: [makeReaction()],
    isUnread: false,
    isEdited: false,
    groupId: null,
    thread: null,
    threadMeta: null,
    saveStatus: statusMocks.default(),
    ...data,
  }
}

export const makeThread = data => {
  const participants = [
    makeUser(),
    makeUser(),
    makeUser(),
  ]
  const message = makeMessage({ author: participants[0] })
  const firstReply = makeMessage({ author: participants[1] })
  return {
    ...message,
    messages: [
      firstReply,
      makeMessage({ author: participants[2] }),
      makeMessage({ author: participants[0] }),
    ],
    sendStatus: statusMocks.default(),
    fetchStatus: statusMocks.default(),
    canFetchFuture: false,
    fetchFutureStatus: statusMocks.default(),
    threadMeta: {
      isParticipant: true,
      participants,
      replyCount: 3,
      seenUpTo: firstReply.id,
      muted: false,
      unreadReplyCount: 2,
    },
    ...data,
  }
}

let conversationIdCnt = 0
export const makeConversation = data => {
  return {
    id: conversationIdCnt++,
    participants: [makeUser()],
    updatedAt: new Date(),
    seenUpTo: null,
    unreadMessageCount: 0,
    notifications: 'all',
    muted: false,
    isClosed: false,
    isParticipant: true,
    type: null,
    targetId: null,
    target: null,
    sendStatus: statusMocks.default(),
    fetchStatus: statusMocks.default(),
    canFetchPast: false,
    fetchPastStatus: statusMocks.default(),
    canFetchFuture: false,
    fetchFutureStatus: statusMocks.default(),
    markStatus: statusMocks.default(),
    messages: [
      makeMessage(),
      makeMessage({ images: makeImages(3, 3) }),
      makeMessage(),
      makeMessage(),
    ],
    ...data,
  }
}

let invitationIdCnt = 0
export const makeInvitation = data => {
  return {
    id: invitationIdCnt++,
    email: `foo${invitationIdCnt}@foo.com`,
    group: makeGroup(),
    invitedBy: makeUser(),
    expiresAt: new Date(),
    createdAt: new Date(),
    ...data,
  }
}

const images = [
  imageRandomA,
  imageRandomB,
  imageRandomC,
  imageRandomD,
  imageRandomE,
  imageRandomF,
  imageFeatureA,
  imageFeatureB,
  imageFeatureC,
  imageLarge,
]

function randomImageUrl () {
  return images[Math.floor(Math.random() * images.length)]
}

let imageIdCnt = 1
export const makeImage = data => {
  const imageUrl = randomImageUrl()
  return {
    id: imageIdCnt++,
    imageUrls: {
      // We don't actually have all the sizes, so use the same for all
      // and just assume that it'll be fine, even if it looks a bit lowres...
      thumbnail: imageUrl,
      200: imageUrl,
      600: imageUrl,
      fullSize: imageUrl,
    },
    ...data,
  }
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const makeImages = (min, max) => {
  return new Array(randomInt(min, max)).fill(null).map(makeImage)
}
