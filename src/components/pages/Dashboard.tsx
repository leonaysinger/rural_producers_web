import { useEffect, useState } from "react"
import { Card, CardTitle, CardValue } from "../../styles/components/Card"
import { FormGrid } from "../../styles/components/FormGrid"
import { getSummary, getFarmsByState, getFarmsByCrop, getLandUsage } from "../../api/report"
import { PieChartWidget } from "../shared/PieChartWidget"

export const Dashboard = () => {
  const [summary, setSummary] = useState({ total_farms: 0, total_area: 0 })
  const [byState, setByState] = useState([])
  const [byCrop, setByCrop] = useState([])
  const [landUsage, setLandUsage] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sum, state, crop, land] = await Promise.all([
          getSummary(),
          getFarmsByState(),
          getFarmsByCrop(),
          getLandUsage()
        ])
        setSummary(sum)
        setByState(state)
        setByCrop(crop)
        setLandUsage(land)
      } catch (e) {
        console.error("Erro ao carregar relatórios", e)
      }
    }
    fetchData()
  }, [])

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f7fa', height: '100%', boxSizing: 'border-box' }}>
      <FormGrid>
        <Card>
          <CardTitle>Total de fazendas cadastradas</CardTitle>
          <CardValue>{summary.total_farms}</CardValue>
        </Card>
        <Card>
          <CardTitle>Total de hectares registrados</CardTitle>
          <CardValue>{summary.total_area.toFixed(2)}</CardValue>
        </Card>
      </FormGrid>
      <div style={{ marginTop: '2rem' }} />
      <FormGrid>
        <Card>
          <PieChartWidget data={byState} title="Distribuição por Estado" />
        </Card>
        <Card>
          <PieChartWidget data={byCrop} title="Distribuição por Cultura" />
        </Card>
        <Card>
          <PieChartWidget data={landUsage} title="Uso do Solo" />
        </Card>
      </FormGrid>
    </div>
  )
}
