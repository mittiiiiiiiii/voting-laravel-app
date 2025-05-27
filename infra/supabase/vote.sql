CREATE TABLE votes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    theme_id BIGINT NOT NULL,
    choice_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_vote_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_theme FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE,
    CONSTRAINT fk_vote_choice FOREIGN KEY (choice_id) REFERENCES choices(id) ON DELETE CASCADE,
    CONSTRAINT unique_vote UNIQUE (user_id, theme_id, choice_id)
);
