'use client'
//styles import
import styles from "./anglebarForm.module.css"

import { steelGrades } from '@/lib/data'
import { convertDotToComa, createStringWithSingleWhiteSpaces } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { FaUndo } from 'react-icons/fa'
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6'

type AnglebarFormData = {
  name: string;
  dimensionA: number;
  dimensionB: number;
  thickness: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const AnglebarForm = () => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
    name: "Kątownik",
    dimensionA: 0,
    dimensionB: 0,
    thickness: 0,
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<AnglebarFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<AnglebarFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);

  const [indexName, setIndexName] = useState("")

  useEffect(() => {
    const newIndexName = `${formData.name.toUpperCase()} ${convertDotToComa(formData.dimensionA)} x ${convertDotToComa(formData.dimensionB)} x ${convertDotToComa(formData.thickness)} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setIsUndoOn(false);
    const {name, value, type} = e.target
    if ("checked" in e.target) {
      const checked = e.target.checked
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
      })
    }
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(indexName)
    setIsUndoOn(false)
  }
  
  const clearForm = () => {
    setFormData(initialFormData);
    setSavedFormData(formData)
    setIsUndoOn(true);
  }

  const undo = () => {
    setIsUndoOn(false);
    setFormData(savedFormData);
  }

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span className={styles.lockIcon}><CiLock /></span></label>
          <input
            type='text'
            name='name'
            // onChange={handleChange}
            readOnly
            value={formData.name}
            disabled
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor='dimensionA'>Wymiar A</label>
          <input
            type='number'
            name='dimensionA'
            onChange={handleChange}
            value={formData.dimensionA}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='dimensionB'>Wymiar B</label>
          <input
            type='number'
            name='dimensionB'
            onChange={handleChange}
            value={formData.dimensionB}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='thickness'>Grubość</label>
          <input
            type='number'
            name='thickness'
            onChange={handleChange}
            value={formData.thickness}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor="gradeEU">Gatunek</label>
          <select
            name='gradeEU'
            onChange={handleChange}
            value={formData.gradeEU}
          >
            <option value={""}>---</option>
            {gradeOptionsArr}
          </select>
        </div>
        <div className={styles.formElement}>
          <label htmlFor='additional'>Dodatkowy opis</label>
          <input
            type='text'
            name='additional'
            onChange={handleChange}
            value={formData.additional}
          />
        </div>
      </form>
      <div className={"resultIndexContainer"}>
        <p className={"resultIndexToCopy"}>{indexName}</p>
        <button 
          onClick={copyToClipboard}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>
        {!isUndoOn && <button 
          onClick={clearForm}
          className={"resultIndexCopyBtn"}
        >
          <FaTrashCan />
        </button>}
        {isUndoOn && <button 
          onClick={undo}
          className={"resultIndexCopyBtn"}
        >
          <FaUndo />
        </button>}
      </div>
    </div>
  )
}

export default AnglebarForm