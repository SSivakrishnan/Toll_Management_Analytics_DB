import React from 'react'

function Modal({open,children,onClose,top,left,bgdark,zindex,width,pxtop}) {
  if(!open) return null
    const overLayStyle={
        right:0,
        left:0,
        top:'-10%',
        bottom:'-13%',
        backgroundColor:(bgdark===undefined)?"rgba(0,0,0,.5)":(bgdark===true)?"rgba(0,0,0,.5)":"transparent",
        position:'fixed',
        zIndex:'1000'
    }
    const modalStyle={
        position:"fixed",
        minHeight:"500px",
        width:(width===undefined)?'500px':width+'px',
        backgroundColor:"white",
        top:(top!==undefined)?top+"%":(pxtop!==undefined)?pxtop+"px":'50%',
        left:(left===undefined)?"50%":left+"%",
        transform:"translate(-50%,-50%)",
        zIndex:(zindex===undefined)?'1000':1000+zindex+"",
        color:"black",
        padding:'30px',
        boxSizing:'border-box'
    }
   const styling={
        transition:"all 0.5s"
   }
   const closeBtn={
        position:'absolute',
        top:'30px',
        right:'30px',
        cursor:'pointer',
   }
    return (
        <div style={styling} className="modal_container">
        <div style={overLayStyle} onClick={onClose}></div>
        <div style={modalStyle}>
            <div style={closeBtn} onClick={onClose}><i class="fa fa-times" aria-hidden="true"></i></div>
          {children}
        </div>
       </div>
    )
}

export default Modal