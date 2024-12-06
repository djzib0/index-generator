'use client'

import { gradeClasses, steelGrades } from '@/lib/data'
import { createStringWithSingleWhiteSpaces } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import styles from "./threadedBarForm.module.css"
import { CiLock } from 'react-icons/ci';
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6';
import { FaUndo } from 'react-icons/fa';


type ThreadedBarFormData = {
  name: string;
  thread: number;
  length?: number;
  din?: string;
  gradeClass?: string;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const ThreadedBarForm = () => {
  
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
    <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const gradeClassesArr = gradeClasses.map((gradeClass) => {
    return (
    <option key={gradeClass.gradeClass} value={gradeClass.gradeClass}>{gradeClass.gradeClass}</option>
    )
  })

  const initialFormData = {
    name: "Pręt gwint.",
    thread: 0,
    length: 0,
    din: "",
    gradeClass: "",
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<ThreadedBarFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<ThreadedBarFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isLengthOn, setIsLengthOn] = useState(false);
  const [isDinOn, setIsDinOn] = useState(false);
  const [isGradeClassOn, setIsGradeClassOn] = useState(false);

  const [indexName, setIndexName] = useState("")

  useEffect(() => {
    const newIndexName = `
    ${formData.name.toUpperCase()} M ${formData.thread} 
    ${isLengthOn ? `x ${formData.length}`: ""}
    ${isDinOn ? `DIN ${formData.din}`: ""}
    ${isGradeClassOn ? `${formData.gradeClass}`: ""}
    ${formData.gradeEU.toUpperCase()} 
    ${formData.additional.toUpperCase()}
    `;
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData, isLengthOn, isDinOn, isGradeClassOn])

  const toggleLength = () => {
    setIsLengthOn(prevState => !prevState);
  }

  const toggleDin = () => {
    setIsDinOn(prevState => !prevState);
  }

  const toggleGradeClass = () => {
    setIsGradeClassOn(prevState => !prevState)
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
            className={`${styles.toggleBtn} ${isLengthOn ? styles.btnOn : styles.btnOff}`}
            onClick={toggleLength}
            >
            Długość
          </button>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isDinOn ? styles.btnOn : styles.btnOff}`}
            onClick={toggleDin}
            >
            DIN
          </button>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isGradeClassOn ? styles.btnOn : styles.btnOff}`}
            onClick={toggleGradeClass}
            >
            Klasa
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
          <label htmlFor='thread'>Gwint</label>
          <input
            type='number'
            name='thread'
            onChange={handleChange}
            value={formData.thread}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='length'>
            Długość [mm]
            {!isLengthOn && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='length'
            onChange={handleChange}
            value={formData.length}
            disabled={!isLengthOn}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='din'>
            DIN
            {!isDinOn && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <input
            type='number'
            name='din'
            onChange={handleChange}
            value={formData.din}
            disabled={!isDinOn}
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
          <label htmlFor="gradeClass">
            Klasa
            {!isGradeClassOn && <span className={styles.lockIcon}><CiLock /></span>}
          </label>
          <select
            name='gradeClass'
            onChange={handleChange}
            value={formData.gradeClass}
            disabled={!isGradeClassOn}
          >
            <option value={""}>---</option>
            {gradeClassesArr}
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

export default ThreadedBarForm