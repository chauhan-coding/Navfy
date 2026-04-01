const RISKY_PATTERNS = [
    /99\.99%|99\.98%|guarantee|guaranteed|unlimited|free forever/i,
    /legal evidence|admissible|insurance savings/i,
    /production-ready enterprise today/i,
]

function sanitize(text) {
    if (!text) return text
    return text
        .replace(/free forever/gi, 'starter pilot pricing')
        .replace(/guarantee/gi, 'target')
        .replace(/unlimited/gi, 'custom')
}

export const QAAgent = {
    id: 'qa-agent',
    validate({ composed, recommendations }) {
        if (!composed?.text || composed.text.trim().length < 8) {
            return {
                status: 'rejected',
                notes: ['Empty or low-information response.'],
                text: 'I could not validate a useful response yet.',
                actions: [],
                recommendations: [],
                demo: null,
                bullets: null,
                reviewedBy: 'QA Agent',
            }
        }

        const riskHits = RISKY_PATTERNS.filter((rx) => rx.test(composed.text))

        let text = sanitize(composed.text)
        let status = 'approved'
        let notes = []

        if (riskHits.length > 0) {
            status = 'revised'
            notes.push('Reworded to remove unsupported claims.')
            text = `${text} I am keeping this aligned to current demo capabilities.`
        }

        const cleanedActions = (composed.actions ?? []).slice(0, 3)
        const cleanedRecommendations = (recommendations ?? []).slice(0, 3)

        if (composed.confidence < 0.5) {
            status = 'needs-clarification'
            notes.push('Low confidence intent detection.')
        }

        return {
            status,
            notes,
            text,
            actions: cleanedActions,
            recommendations: cleanedRecommendations,
            demo: composed.demo,
            bullets: composed.bullets ?? null,
            reviewedBy: 'QA Agent',
        }
    },
}
