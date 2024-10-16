import React from 'react'

const RequestDetails = (props) => {
    const { mTask } = props
    const location = mTask?.requestTask?.machine?.location?.name
    const typeOfFailure = mTask?.typeOfFailure?.details


    console.log


    const translateTime = (time) => {
        const isoDate = time
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleString('th-TH', {
            timeZone: 'Asia/Bangkok',
            hour12: false, // แสดงเวลาแบบ 24 ชั่วโมง
        });
        return formattedDate
    }
    return (

        <div className="w-1/2 space-y-4">
            {/* Left section - Request details */}
            <div className='flex gap-2'>
                {location === "Factory1" ? <div className="badge badge-primary badge-outline">{location}</div> : <div className="badge badge-warning badge-outline">{location}</div>}
                {typeOfFailure === "Mechanical" ? <div className="badge badge-primary">{typeOfFailure}</div> : typeOfFailure === "Electrical" ? <div className="badge badge-secondary">{typeOfFailure}</div> : <div className="badge badge-info">{typeOfFailure}</div>}
            </div>
            <div className="space-y-2">
                <p className="text-sm">
                    <strong>Request ID: </strong> {mTask?.req} {mTask?.requestId}
                </p>
                <p className="text-sm">
                    <strong>Request by: </strong> {mTask?.requestTask?.employee?.firstName} {mTask?.requestTask?.employee?.lastName}
                </p>
                <p className="text-sm">
                    <strong>Requested Time: </strong> {translateTime(mTask?.requestTask?.requestTime)}
                </p>
                <p className="text-sm">
                    <strong>Updated Time: </strong> {translateTime(mTask?.requestTask?.updatedTime)}
                </p>
                <p className="text-sm">
                    <strong>Division: </strong> {mTask?.requestTask?.department?.name}
                </p>
                <p className="text-sm">
                    <strong>Machine ID.: </strong> {mTask?.machineId}
                </p>
                <p className="text-sm">
                    <strong>Machine name: </strong> {mTask?.requestTask?.machine?.name}
                </p>
                <p className="text-sm">
                    <strong>Machine observations: </strong> {mTask?.requestTask?.faultSymptoms}
                </p>
                <div className='divider'></div>
                <p className="text-sm">
                    <strong>Assigned to: </strong> {mTask?.employee?.firstName} {mTask?.employee?.lastName}
                </p>
                <p className="text-sm">
                    <strong>Note: </strong> {mTask?.note}
                </p>
                {mTask?.status === "backlog" ?
                    <p className="flex items-center text-sm">
                        <strong>Status: </strong><span className="w-3 h-3 rounded-full bg-purple-500 mx-2"></span>{' '}{mTask?.status}
                    </p>
                    : mTask?.status === "inProgress" ?
                        <p className="flex items-center text-sm">
                            <strong>Status: </strong><span className="w-3 h-3 rounded-full bg-orange-500 mx-2"></span>{' '}{mTask?.status}
                        </p>
                        : mTask?.status === "inReview" ?
                            <p className="flex items-center text-sm">
                                <strong>Status: </strong><span className="w-3 h-3 rounded-full bg-blue-500 mx-2"></span>{' '}{mTask?.status}
                            </p>
                            :
                            <p className="flex items-center text-sm">
                                <strong>Status: </strong><span className="w-3 h-3 rounded-full bg-green-500 mx-2"></span>{' '}{mTask?.status}
                            </p>
                }
                {mTask?.status === "inReview" || mTask?.status === "success" ?
                    <>
                        <p className="text-sm">
                            <strong>Root cause type: </strong> {mTask?.typeOfRootCause?.details}
                        </p>
                        <p className="text-sm">
                            <strong>Root cause details: </strong> {mTask?.rootCauseDetail}
                        </p>
                        <p className="text-sm">
                            <strong>Root cause details: </strong> {mTask?.rootCauseDetail}
                        </p>
                        <p className="text-sm">
                            <strong>Operation details: </strong> {mTask?.operationDetails}
                        </p>
                        <p className="text-sm">
                            <strong>Preventing Recurrence: </strong> {mTask?.preventingRecurrence}
                        </p>
                        <p className="text-sm">
                            <strong>Additional suggestions: </strong> {mTask?.additionalSuggestions}
                        </p>
                    </>
                    :
                    <></>
                    }


            </div>
        </div>

    )
}

export default RequestDetails