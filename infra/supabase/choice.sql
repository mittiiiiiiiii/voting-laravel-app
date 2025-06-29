CREATE TABLE choices (
    id BIGSERIAL PRIMARY KEY,
    theme_id BIGINT NOT NULL,
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_theme FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);
