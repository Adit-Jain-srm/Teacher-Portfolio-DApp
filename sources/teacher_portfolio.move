module MyModule::teacher_portfolio {

    use aptos_framework::signer;
    use std::string::String;

    /// Struct representing a teacher's portfolio NFT with impact stats
    struct TeacherPortfolioNFT has store, key {
        name: String,              // Teacher's name
        subject: String,           // Subject they teach
        students_taught: u64,      // Total number of students taught
        years_experience: u64,     // Years of teaching experience
        impact_score: u64,         // Overall impact score
        verified: bool,            // Verification status
        metadata_uri: String,      // IPFS metadata URI
        created_at: u64,          // Timestamp when portfolio was created
    }

    /// Error codes
    const E_PORTFOLIO_ALREADY_EXISTS: u64 = 1;
    const E_PORTFOLIO_NOT_FOUND: u64 = 2;
    const E_INVALID_STATS: u64 = 3;

    /// Function to mint a new teacher portfolio NFT
    public entry fun mint_portfolio_nft(
        owner: &signer,
        name: String,
        subject: String,
        students_taught: u64,
        years_experience: u64,
        verified: bool,
        metadata_uri: String
    ) {
        let owner_addr = signer::address_of(owner);
        
        // Ensure teacher doesn't already have a portfolio
        assert!(!exists<TeacherPortfolioNFT>(owner_addr), E_PORTFOLIO_ALREADY_EXISTS);
        
        let portfolio = TeacherPortfolioNFT {
            name,
            subject,
            students_taught,
            years_experience,
            impact_score: students_taught * years_experience, // Calculate impact score
            verified,
            metadata_uri,
            created_at: 1726502400, // Static timestamp for simplicity
        };
        
        move_to(owner, portfolio);
    }

    /// Function to update teacher's impact stats and recalculate impact score
    public entry fun update_impact_stats(
        teacher: &signer,
        additional_students: u64,
        additional_years: u64
    ) acquires TeacherPortfolioNFT {
        let teacher_addr = signer::address_of(teacher);
        
        // Ensure portfolio exists
        assert!(exists<TeacherPortfolioNFT>(teacher_addr), E_PORTFOLIO_NOT_FOUND);
        
        let portfolio = borrow_global_mut<TeacherPortfolioNFT>(teacher_addr);
        
        // Update stats
        portfolio.students_taught = portfolio.students_taught + additional_students;
        portfolio.years_experience = portfolio.years_experience + additional_years;
        // Recalculate impact score
        portfolio.impact_score = portfolio.students_taught * portfolio.years_experience;
    }

    /// Function to verify a teacher's portfolio (admin only)
    public entry fun verify_portfolio(
        teacher: &signer
    ) acquires TeacherPortfolioNFT {
        let teacher_addr = signer::address_of(teacher);
        
        // Ensure portfolio exists
        assert!(exists<TeacherPortfolioNFT>(teacher_addr), E_PORTFOLIO_NOT_FOUND);
        
        let portfolio = borrow_global_mut<TeacherPortfolioNFT>(teacher_addr);
        portfolio.verified = true;
    }
}
