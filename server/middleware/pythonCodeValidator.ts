import { Request, Response, NextFunction } from 'express'

function validatePythonCode(req: Request, res: Response, next: NextFunction) {
  const pythonCode: string = req.body.pythonCode

  const importRegex = /^from\s+[\w]+\s+import\s+[\w]+/gm
  const validImport = 'from Player import player'
  const imports = pythonCode.match(importRegex) || []
  const hasInvalidImports = imports.some(imp => imp.trim() !== validImport)

  if (hasInvalidImports) {
    return res.status(400).send('Invalid import statement found.')
  }

  if (pythonCode.includes('eval(') || pythonCode.includes('exec(')) {
    return res.status(400).send('Usage of eval or exec is not allowed.')
  }

  next()
}

export default validatePythonCode
