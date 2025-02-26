import React from 'react'

const GenderCheckBox = ({handleCheckboxChange,selectedGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className='label-text text-white'>Male</span>
					<input
						type='checkbox'
						className='checkbox border-slate-50'
						checked={selectedGender === "male"}
						onChange={() => handleCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
					<span className='label-text text-white'>Female</span>
					<input
						type='checkbox'
						className='checkbox border-slate-50'
						checked={selectedGender === "female"}
						onChange={() => handleCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
}

export default GenderCheckBox