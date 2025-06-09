import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Crops } from '../components/pages/Crops'
import * as api from '../api/crop'
import { Provider } from 'react-redux'
import { store } from '../app/store'

jest.mock('../app/hooks', () => ({
    useAppSelector: () => ({ name: 'Usuário Teste' })
}))

jest.mock('../utils/baseUrl', () => ({
    getBaseUrl: () => 'http://localhost:3000',
}))

jest.mock('../api/crop')

describe('Crops page', () => {
    const mockedCrops = [
        { id: '1', name: 'Soja' },
        { id: '2', name: 'Milho' }
    ]

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('renders crop list after loading', async () => {
        (api.getCrops as jest.Mock).mockResolvedValue(mockedCrops)

        render(
            <Provider store={store}>
                <Crops />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('Soja')).toBeInTheDocument()
            expect(screen.getByText('Milho')).toBeInTheDocument()
        })
    })

    it('handles API error when loading crops', async () => {
        (api.getCrops as jest.Mock).mockRejectedValue(new Error('Erro'))

        render(
            <Provider store={store}>
                <Crops />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('Erro ao carregar culturas')).toBeInTheDocument()
        })
    })

    it('opens form to add new crop', async () => {
        (api.getCrops as jest.Mock).mockResolvedValue([])

        render(
            <Provider store={store}>
                <Crops />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('Nenhuma cultura cadastrada.')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('+ Nova Cultura'))
        expect(screen.getByText('Nova Cultura')).toBeInTheDocument()
    })

    it('submits new crop form', async () => {
        (api.getCrops as jest.Mock).mockResolvedValue([]);
        (api.postCrop as jest.Mock).mockResolvedValue({ id: '3', name: 'Trigo' });

        render(
            <Provider store={store}>
                <Crops />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('+ Nova Cultura')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('+ Nova Cultura'))

        const input = screen.getByPlaceholderText('Nome da cultura')
        fireEvent.change(input, { target: { value: 'Trigo' } })

        fireEvent.click(screen.getByText('Salvar'))

        await waitFor(() => {
            expect(screen.getByText('Cultura cadastrada com sucesso!')).toBeInTheDocument()
            expect(screen.getByText('Trigo')).toBeInTheDocument()
        })
    })

    it('edits existing crop', async () => {
        (api.getCrops as jest.Mock).mockResolvedValue(mockedCrops);
        (api.updateCrop as jest.Mock).mockResolvedValue({ id: '1', name: 'Soja Atualizada' });

        render(
            <Provider store={store}>
                <Crops />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('Soja')).toBeInTheDocument()
        })

        fireEvent.click(screen.getAllByText('Editar')[0])
        const input = screen.getByPlaceholderText('Nome da cultura')
        fireEvent.change(input, { target: { value: 'Soja Atualizada' } })
        fireEvent.click(screen.getByText('Salvar'))

        await waitFor(() => {
            expect(screen.getByText('Cultura atualizada com sucesso!')).toBeInTheDocument()
            expect(screen.getByText('Soja Atualizada')).toBeInTheDocument()
        })
    })

    it('deletes a crop', async () => {
        (api.getCrops as jest.Mock).mockResolvedValue(mockedCrops);
        (api.deleteCrop as jest.Mock).mockResolvedValue({});

        render(
            <Provider store={store}>
                <Crops />
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText('Milho')).toBeInTheDocument()
        })

        fireEvent.click(screen.getAllByText('Excluir')[1])

        await waitFor(() => {
            expect(screen.getByText('Deseja excluir Milho?')).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText('Sim, excluir'))

        await waitFor(() => {
            expect(screen.getByText('Cultura excluída com sucesso')).toBeInTheDocument()
        })
    })
})
