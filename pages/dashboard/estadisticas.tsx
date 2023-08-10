import { useEffect } from "react"
import { useGlobalContext } from "../../context/GlobalContext"
import LayoutDashboard from "../../layout/LayoutDashboard"
import { currentDate } from "../../dates/date"


const Estadisticas = () => {
  const { dailySaleContext, LibraryData, dailyTicketContext } = useGlobalContext()
  const { dailySale,dailyTicket, averageTicket} = LibraryData

  useEffect(() => {
    dailySaleContext()
    dailyTicketContext()
  },[dailySale,dailyTicket])
  console.log('dailySale', dailySale)
  console.log('date', currentDate())
  return (
    <LayoutDashboard>
      <div>
        <div>pagina de estadisticas</div>
        {/* <div>venta del dia : {dailySale ? dailySale : 0}</div> */}
        <div>venta del dia : {dailySale && dailySale }</div>
          <div>numero de tickets : {dailyTicket && dailyTicket}</div>
          <div>ticket promedio : {averageTicket ? averageTicket : 0}</div>
      </div>
    </LayoutDashboard>
  )
}

export default Estadisticas