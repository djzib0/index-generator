'use client'

import { steelGrades} from '@/lib/data'
import { createStringWithSingleWhiteSpaces } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { FaUndo } from 'react-icons/fa'
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6'
// styles import
import styles from "./cSectionForm.module.css"

type CSectionFormData = {
  name: string;
  dimensionA: number;
  dimensionB: number;
  dimensionC: number;
  thickness: number;
  gradeClass: string;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const CSectionForm = () => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
    <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
    name: "Ceownik",
    dimensionA: 0,
    dimensionB: 0,
    dimensionC: 0,
    thickness: 0,
    gradeClass: "",
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<CSectionFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<CSectionFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isDimensionB, setIsDimensionB] = useState(false);
  const [isDimensionC, setIsDimensionC] = useState(false);
  const [isThickness, setIsThickness] = useState(false);

  const [indexName, setIndexName] = useState("")

  useEffect(() => {
    const newIndexName = `
    ${formData.name.toUpperCase()} ${formData.dimensionA} 
    ${isDimensionB ? `${formData.dimensionA}`: ""}
    ${isDimensionC ? `${formData.gradeClass}`: ""}
    ${formData.gradeEU.toUpperCase()} 
    ${formData.additional.toUpperCase()}
    `;
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData, isDimensionB, isDimensionC])

  const toggleDimensionB = () => {
    setIsDimensionB(prevState => !prevState);
  }

  const toggleDimensionC = () => {
    setIsDimensionC(prevState => !prevState);
  }

  const toggleThickness = () => {
    setIsThickness(prevState => !prevState);
  }

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
      <div className={styles.btnContainer}>
        <p>Kliknij aby wyłączyć lub włączyć.</p>
        <div className={styles.btns}>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isDimensionB ? styles.btnOn : styles.btnOff}`}
            onClick={toggleDimensionB}
            >
            Wymiar B
          </button>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isDimensionC ? styles.btnOn : styles.btnOff}`}
            onClick={toggleDimensionC}
            >
            Wymiar C
          </button>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isThickness ? styles.btnOn : styles.btnOff}`}
            onClick={toggleThickness}
            >
            Grubość
          </button>
        </div>
      </div>
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
          <label htmlFor='dimensionA'>Wymiar A [mm]</label>
          <input
            type='number'
            name='dimensionA'
            onChange={handleChange}
            value={formData.dimensionA}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='dimensionB'>
            Wymiar B [mm]
            {!isDimensionB && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='dimensionB'
            onChange={handleChange}
            value={formData.dimensionB}
            disabled={!isDimensionB}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='din'>
            Wymiar C [mm]
            {!isDimensionC && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='din'
            onChange={handleChange}
            value={formData.dimensionC}
            disabled={!isDimensionC}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='thickness'>
            Grubość [mm]
            {!isThickness && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='thickness'
            onChange={handleChange}
            value={formData.thickness}
            disabled={!isThickness}
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

export default CSectionForm