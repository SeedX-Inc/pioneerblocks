import React from "react"
import "./LatestEvents.css" // Create a new module CSS file

const SpeakerList = ({ speakers }) => {
	return (
		<div className="speakerList">
			Speakers:{' '}
			{speakers.map((speaker, index) => (
				<span key={index}>
          <span className="authorLink">{speaker.speakerName}</span>
					{index < speakers.length - 1 ? " and " : ""}
        </span>
			))}
		</div>
	)
}

export default SpeakerList
