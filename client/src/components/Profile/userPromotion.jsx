import React from 'react'

import { demoProfilePicture } from '../../constants';

const UserPromotion = ({ promotion }) => {
    return (
        <div>
            <ul role="list" class="divide-y divide-gray-100">
                <li class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-x-6 py-5">
                    <div class="flex gap-x-4">
                        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src={promotion?.channel?.snippet?.thumbnails?.high?.url || demoProfilePicture } alt={promotion?.channel?.snippet?.title}/>
                            <div class="min-w-0 flex-auto">
                                <p class="text-sm font-semibold leading-6 text-white">{promotion.channel.snippet.title}</p>
                                <p class="mt-1 truncate text-xs leading-5 text-gray-500">{promotion?.channel?.snippet?.customUrl}</p>
                            </div>
                    </div>
                    <div class=" sm:flex sm:flex-col sm:items-end pt-5 sm:pt-0">
                        <p class="mt-1 text-sm leading-5 text-gray-500">From {promotion?.channel?.createdAt ? new Date(promotion?.channel.createdAt).toDateString() : ''}</p>
                        <p class="mt-1 text-sm leading-5 text-gray-500">To {promotion?.channel?.expireAt ? new Date(promotion?.channel.expireAt).toDateString() : ''}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UserPromotion