
import  { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Loader2, Copy, CheckCircle2, Users } from 'lucide-react'

interface RoomDialogProps {
  isOpen: boolean
  onClose: () => void
  roomId: string | null
  isPlayer1: boolean
  onStartGame: () => void
  isPlayer2Connected: boolean
}

export function RoomConnectDialog({ isOpen, onClose, roomId, isPlayer1, onStartGame, isPlayer2Connected }: RoomDialogProps) {
  const [copied, setCopied] = useState(false)
  const [showLoader, setShowLoader] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room?room_id=${roomId}`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowLoader(true)
    }, 500)
  }

  useEffect(() => {
    if (isPlayer2Connected) {
      setShowLoader(false)
    }
  }, [isPlayer2Connected])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-stone-700 text-amber-50">
        <DialogHeader>
          <DialogTitle className="text-amber-50">
            {isPlayer1 ? 'Create Game Room' : 'Join Game Room'}
          </DialogTitle>
          <DialogDescription className="text-amber-100">
            {isPlayer1
              ? 'Share this room link with your opponent'
              : 'Connected to the room successfully'}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {isPlayer1 && !showLoader && !isPlayer2Connected && (
            <motion.div
              key="share-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 py-4"
            >
              <Input
                value={`${window.location.origin}/room?room_id=${roomId}`}
                readOnly
                className="bg-stone-600 text-amber-50 border-lime-600"
              />
              <Button onClick={copyToClipboard} className="bg-lime-600 text-amber-50 hover:bg-lime-700">
                {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </motion.div>
          )}
          {((isPlayer1 && showLoader) || (!isPlayer1)) && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-12 w-12 text-lime-600" />
              </motion.div>
              <p className="mt-4 text-amber-100">
                {isPlayer1 ? 'Waiting for opponent to join...' : 'Waiting for host to start game...'}
              </p>
            </motion.div>
          )}
          {isPlayer1 && isPlayer2Connected && (
            <motion.div
              key="start-game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <Users className="h-12 w-12 text-lime-600 mb-4" />
              <p className="text-amber-100 mb-4">Opponent connected!</p>
              <Button onClick={onStartGame} className="bg-lime-600 text-amber-50 hover:bg-lime-700">
                Start Game
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

